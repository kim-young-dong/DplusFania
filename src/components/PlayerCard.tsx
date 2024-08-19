"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
// import style from "./styles/PlayerCard.module.css";
import styled from "styled-components";
import { round, clamp, getRandomNumber } from "@/constant/math";
import styles from "./PlayerCard.module.css";

interface Card {
  imgURL: string;
}

const CardContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={styles.card_container}>{children}</div>;
};

const PlayerCard = ({ card }: { card: Card }) => {
  const cardTranslaterRef = useRef<HTMLDivElement>(null);
  const [isPickedup, setIsPickedup] = useState(false); // 카드 pickup 상태
  const [isActive, setIsActive] = useState(false); // 카드 active 상태
  const [interacting, setInteracting] = useState(true); // 마우스 인터렉션 상태
  const [pointer, setPointer] = useState({ x: 0, y: 0 }); // 마우스 포인터 위치
  const [transform, setTransform] = useState({
    sec: 0,
    rotateX: 0,
    rotateY: 0,
  }); // 카드 회전 각도

  // 카드가 active 상태일 때 360도 회전된 상태로 변경
  const rotateDelta = useMemo(() => {
    return isActive ? { x: 0, y: 360 } : { x: 0, y: 0 };
  }, [isActive]);

  // 광택 효과
  const glareStyle = useMemo(() => {
    if (interacting === false) return { x: 0, y: 0, o: 0 };

    const percent = {
      x: clamp(round((100 / 340) * pointer.x)),
      y: clamp(round((100 / 490) * pointer.y)),
    };
    return {
      x: `${percent.x}%`,
      y: `${percent.y}%`,
      o: pointer.x * pointer.y > 0 ? 1 : 0,
    };
  }, [pointer, interacting]);

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
    if (interacting === false) return;
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
      rotateY: round((offsetX / 270) * 60 - 30 + rotateDelta.y),
    });
  };
  const interactEnd = () => {
    if (interacting === true) {
      setPointer({ x: 0, y: 0 });
      setTransform({
        sec: 1,
        rotateX: 0,
        rotateY: 0 + rotateDelta.y,
      });
    }
  };

  // 클릭 이벤트
  const activate = () => {
    if (isPickedup) {
      const popover = () => {
        if (interacting === false) return;
        setIsActive((pre) => !pre);
        setPointer({ x: 0, y: 0 });
        if (isActive === true) {
          setTransform({ sec: 1, rotateX: 0, rotateY: 0 });
        } else {
          setTransform({ sec: 1, rotateX: 0, rotateY: 360 });
        }
        setInteracting(false);
        setTimeout(() => {
          setInteracting(true);
        }, 1000);
      };
      popover();
    } else {
      const cardPickup = () => {
        setIsPickedup(true);
        setTimeout(() => {
          setInteracting(true);
        }, 1000);
      };
      cardPickup();
    }
  };

  return (
    <CardContainer>
      <div
        ref={cardTranslaterRef}
        className={`${styles["card_translater"]} ${
          isPickedup ? styles["pickup"] : ""
        }`}
        style={dynamicStyles}
        onMouseMove={interact}
        onTouchMove={interact}
        onMouseOut={interactEnd}
        onTouchEnd={interactEnd}
        onClick={activate}
      >
        <div className={`${styles.card_item} ${styles.card_back}`}>
          <Image
            className={styles.card_back}
            src={"/images/cards/card_back.png"}
            alt={"card_back"}
            width={340}
            height={475}
          />
        </div>
        <div className={`${styles.card_item} ${styles.card_front}`}>
          <div className={styles["card_glare"]}></div>
          <Image
            className={styles.card_front}
            src={
              "https://ncxbzukabsvxtmxrfwzx.supabase.co/storage/v1/object/public/player-card-bucket/lucid/card_galaxy.png"
            }
            alt={"card_back"}
            width={340}
            height={475}
          />
        </div>
      </div>
    </CardContainer>
  );
};

export default PlayerCard;
