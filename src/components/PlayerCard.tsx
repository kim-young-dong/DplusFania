"use client";
import React, { useState, useMemo, useRef, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { randomCardPickup, CardProduct } from "@/actions/card";
import { round, clamp, getRandomNumber } from "@/constant/math";
import styles from "./PlayerCard.module.css";

const PlayerCard = ({ todaysCard }: { todaysCard: CardProduct | null }) => {
  const cardTranslaterRef = useRef<HTMLDivElement>(null);
  const doingPopOver = useRef(false);
  const test = useRef();

  const [cardData, setCardData] = useState<CardProduct | null>(
    todaysCard || null
  );

  const [rotateDirectionY, setRotateDirectionY] = useState<360 | 0>(0); // Y축 회전 방향
  const [pointer, setPointer] = useState({ x: 0, y: 0 }); // 마우스 포인터 위치
  const [transform, setTransform] = useState({
    sec: 0,
    rotateX: 0,
    rotateY: 0,
  }); // 카드 회전 각도

  // 카드를 원래 자리로 돌려놓는 이벤트
  useEffect(() => {
    setPointer({ x: 0, y: 0 });
    setTransform({
      sec: 1,
      rotateX: 0,
      rotateY: 0 + rotateDirectionY,
    });
  }, [rotateDirectionY]);

  // 광택 효과
  const glareStyle = useMemo(() => {
    const percent = {
      x: clamp(round((100 / 340) * pointer.x)),
      y: clamp(round((100 / 490) * pointer.y)),
    };
    return {
      x: `${percent.x}%`,
      y: `${percent.y}%`,
      o: pointer.x * pointer.y > 0 ? 1 : 0,
    };
  }, [pointer]);

  // 동적 스타일
  const dynamicStyles = {
    "--pointer-x": glareStyle.x,
    "--pointer-y": glareStyle.y,
    "--glare-opacity": glareStyle.o,
    "--rotate-x": `${transform.rotateX}deg`,
    "--rotate-y": `${transform.rotateY}deg`,
    "--transition-sec": `${transform.sec}s`,
    "--card-edge": "#FFEE93",
    "--card-glow": "#FFEE93",
    "--front-visibility": "hidden",
  } as React.CSSProperties;

  // 마우스 인터렉션
  const interact = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
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
      setCardData(await randomCardPickup());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.card_container} style={dynamicStyles}>
      <div
        ref={cardTranslaterRef}
        className={styles["card_translater"]}
        onClick={!!todaysCard ? popover : cardPickup}
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
          <Image
            className={styles.card_back}
            src={"/images/cards/card_back.png"}
            alt={"카드 뒷면"}
            width={340}
            height={475}
          />
        </div>
        {cardData && (
          <div className={`${styles.card_item} ${styles.card_front}`}>
            <div className={styles["card_glare"]}></div>
            <Image
              className={styles.card_front}
              src={cardData?.imgURL}
              alt={`선수명: ${cardData.player.name} 카드명: ${cardData.name}`}
              width={340}
              height={475}
              onLoad={() => {
                if (cardData && !todaysCard) {
                  document.documentElement.style.setProperty(
                    "--card-front-opacity",
                    "0"
                  );
                  cardTranslaterRef.current?.classList.add(
                    styles["pickup_active"]
                  );
                  setTimeout(() => {
                    document.documentElement.style.setProperty(
                      "--card-front-opacity",
                      "1"
                    );
                  }, 1200);
                }
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
