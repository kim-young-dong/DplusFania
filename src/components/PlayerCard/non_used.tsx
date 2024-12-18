"use client";
// initialCard를 props로 받지 않고 useEffect와 useState를 사용하여 컴포넌트 내에서 fetch

import React, { useState, useMemo, useRef, useEffect } from "react";
import NextImage from "next/image";
import {
  randomCardPickup,
  getRandomCard,
  CardProduct,
  getTodaysCard,
} from "@/actions/card";
import { round, clamp } from "@/constant/math";
import { useUser } from "@/context/userContext";
import styles from "./PlayerCard.module.css";
import { set } from "zod";

// 사용자 정의 CSS 변수를 포함하는 인터페이스 정의
interface CustomCSSProperties extends React.CSSProperties {
  "--pointer-x"?: string;
  "--pointer-y"?: string;
  "--glare-opacity"?: number;
  "--rotate-x"?: string;
  "--rotate-y"?: string;
  "--transition-sec"?: string;
  "--card-edge"?: string;
  "--card-glow"?: string;
  "--front-visibility"?: string;
  "--front-opacity"?: number;
}

export default function PlayerCard() {
  const [rendomCard, setRendomCard] = useState<CardProduct>({
    name: "name",
    player: {
      name: "player",
      position: "position",
    },
    type: "type",
    imgURL: "/images/card_back.png",
    user_id: "user_id",
  });
  const [initialCard, setInitialCard] = useState<
    CardProduct | null | undefined
  >(undefined);

  useEffect(() => {
    console.log("fetchRandomCard");
    const fetchRandomCard = async () => {
      const initialCard = (await getTodaysCard()) ?? null;
      const randomCard = await getRandomCard();
      setInitialCard(initialCard);
      setRendomCard(randomCard);
    };

    fetchRandomCard();
  }, []);

  useEffect(() => {
    console.log("initialCard", initialCard);
    if (initialCard) {
      setCardData(initialCard);
    }
  }, [initialCard]);

  const cardTranslaterRef = useRef<HTMLDivElement>(null);
  const doingPopOver = useRef(false);
  const cardFrontRef = useRef<HTMLDivElement>(null);

  const [cardData, setCardData] = useState<CardProduct | null>(
    initialCard ?? null,
  );
  const [isCardLoaded, setIsCardLoading] = useState(false);
  const [rotateDirectionY, setRotateDirectionY] = useState<360 | 0>(0); // Y축 회전 방향
  const [pointer, setPointer] = useState({ x: 0, y: 0 }); // 마우스 포인터 위치
  const [transform, setTransform] = useState({
    sec: 0,
    rotateX: 0,
    rotateY: 0,
  }); // 카드 회전 각도

  const { user } = useUser();

  useEffect(() => {
    if (!!cardData && isCardLoaded) {
      // 카드 로드시 발생하는 이벤트
      // 최초 뽑기 이벤트에서 카드 로드 완료시 카드를 보여줌
      if (!initialCard) {
        console.log("pickup");
        cardTranslaterRef.current?.classList.add(styles["pickup_active"]);

        const time = setTimeout(() => {
          cardFrontRef.current?.classList.remove(styles["hidden"]);
        }, 1000);
      }
      console.log("has initialCard", initialCard);
    }
  }, [cardData, isCardLoaded]);

  // 카드를 원래 자리로 돌려놓는 이벤트
  useEffect(() => {
    setPointer({ x: 0, y: 0 });
    setTransform({
      sec: 1,
      rotateX: 0,
      rotateY: 0 + rotateDirectionY,
    });
  }, [rotateDirectionY]);

  // 유저가 로그아웃했을 때 카드를 초기화
  useEffect(() => {
    if (!user) {
      setCardData(null);
      setInitialCard(null);
    }
  }, [user]);

  // 광택 효과
  const glareStyle = useMemo(() => {
    const percent = {
      x: clamp(round((100 / 272) * pointer.x)),
      y: clamp(round((100 / 380) * pointer.y)),
    };
    return {
      x: `${percent.x}%`,
      y: `${percent.y}%`,
      o: pointer.x * pointer.y > 0 ? 1 : 0,
    };
  }, [pointer]);

  // 동적 스타일
  const dynamicStyles: CustomCSSProperties = {
    "--pointer-x": glareStyle.x,
    "--pointer-y": glareStyle.y,
    "--glare-opacity": glareStyle.o,
    "--rotate-x": `${transform.rotateX}deg`,
    "--rotate-y": `${transform.rotateY}deg`,
    "--transition-sec": `${transform.sec}s`,
    "--card-edge": "#FFEE93",
    "--card-glow": "#FFEE93",
    "--front-visibility": isCardLoaded ? "visible" : "hidden",
  } as React.CSSProperties;

  // 마우스 인터렉션
  const interact = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (doingPopOver.current === true) return;

    let offsetX, offsetY;
    // 이벤트 타입에 따라 offsetX, offsetY 값을 설정
    if (event.nativeEvent instanceof MouseEvent) {
      offsetX = event.nativeEvent.offsetX;
      offsetY = event.nativeEvent.offsetY;
    } else if (
      event.nativeEvent instanceof TouchEvent &&
      event.nativeEvent.touches.length > 0
    ) {
      const touch = event.nativeEvent.touches[0];
      const target = touch.target as HTMLDivElement;
      offsetX = touch.clientX - target.offsetLeft;
      offsetY = touch.clientY - target.offsetTop;
    } else {
      return; // 이벤트 처리를 위한 조건이 충족되지 않음
    }
    setPointer({
      x: offsetX,
      y: offsetY,
    });

    setTransform({
      sec: 0,
      rotateX: round((offsetY / 380) * 60 - 30),
      rotateY: round((offsetX / 270) * 60 - 30 + rotateDirectionY),
    });
  };
  const interactEnd = () => {
    setPointer({ x: 0, y: 0 });
    setTransform({
      sec: 1,
      rotateX: 0,
      rotateY: 0 + rotateDirectionY,
    });
  };

  // 클릭 이벤트
  const popover = () => {
    if (doingPopOver.current === true) return;

    doingPopOver.current = true;
    setRotateDirectionY((prev) => (prev === 0 ? 360 : 0));

    setTimeout(() => {
      doingPopOver.current = false;
    }, 1000);
  };

  // 카드 픽업 이벤트
  const cardPickup = async () => {
    // insert card to collection
    try {
      const card = !!user ? await randomCardPickup(rendomCard) : rendomCard;
      console.log("pickup", card);

      setCardData(card);
      cardFrontRef.current?.classList.add(styles["hidden"]);
    } catch (error) {
      console.error(error);
    }
  };

  const handelClick = () => {
    if (cardData) {
      popover();
    } else {
      cardPickup();
    }
  };

  return (
    <div className={styles.card_container} style={dynamicStyles}>
      {initialCard !== undefined && (
        <div
          ref={cardTranslaterRef}
          className={styles["card_translater"]}
          onClick={handelClick}
          onMouseMove={interact}
          onTouchMove={interact}
          onMouseLeave={() => {
            if (doingPopOver.current === false) {
              interactEnd();
            }
          }}
          onTouchEnd={() => {
            if (doingPopOver.current === false) {
              interactEnd();
            }
          }}
        >
          <div className={`${styles.card_item} ${styles.card_back}`}>
            <NextImage
              className={styles.card_back}
              src={"/images/card_back.png"}
              alt={"카드 뒷면"}
              fill
              sizes="max-width: 272px max-height: 380px"
            />
          </div>
          <div
            ref={cardFrontRef}
            className={`${styles.card_item} ${styles.card_front}`}
          >
            {cardData && (
              <>
                <div className={styles["card_glare"]}></div>
                <NextImage
                  className={styles.card_front}
                  src={cardData?.imgURL}
                  alt={`선수명: ${cardData.player.name} 카드명: ${cardData.name}`}
                  sizes="max-width: 272px max-height: 380px"
                  fill
                  onLoad={() => {
                    setIsCardLoading(true);
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
