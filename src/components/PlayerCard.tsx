"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
// import style from "./style/PlayerCard.module.css";
import styled from "styled-components";

interface Card {
  rank: number;
  player: {
    name: string;
    position: string;
  };
  img: string;
}
// 소수점 자리수 반올림
const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));
// 최소, 최대값 제한
const clamp = (value: number, min = 0, max = 100) => {
  return Math.min(Math.max(value, min), max);
};

const PlayerCard = ({ card }: { card: Card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [interacting, setInteracting] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({
    sec: 0,
    rotateX: 0,
    rotateY: 0,
  });
  // 카드가 active 상태일 때 360도 회전된 상태로 변경
  const isTurn = useMemo(() => {
    return isActive ? 360 : 0;
  }, [isActive]);

  // 광택 효과
  const overlayStyle = useMemo(() => {
    // interacting 상태가 아닐 때 리턴
    if (interacting === false) return { x: 0, y: 0 };

    const percent = {
      x: clamp(round((100 / 340) * pointer.x)),
      y: clamp(round((100 / 490) * pointer.y)),
    };
    return {
      x: `${percent.x}%`,
      y: `${percent.y}%`,
    };
  }, [pointer, interacting]);

  // 마우스 이동 이벤트
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // interacting 상태가 아닐 때 리턴
    if (interacting === false) return;

    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;

    // 카드 회전 스타일링
    setTransform({
      sec: 0,
      rotateX: (offsetY / 490) * 80 - 40,
      rotateY: (offsetX / 340) * 80 - 40 + isTurn,
    });

    // 마우스 포인터 위치 변경
    setPointer({
      x: offsetX,
      y: offsetY,
    });
  };
  // 클릭 이벤트
  const activate = () => {
    // active 상태 변경
    setIsActive((pre) => !pre);
    // pointer 초기화, 카드 회전
    isActive
      ? setTransform({ sec: 1, rotateX: 0, rotateY: 0 })
      : setTransform({ sec: 1, rotateX: 0, rotateY: 360 });
    setPointer({ x: 0, y: 0 });
    // interacting 상태 변경, 1초 후 재활성화
    setInteracting(false);
    setTimeout(() => {
      setInteracting(true);
    }, 1000);
  };
  return (
    <CardTransLater>
      <Card
        style={{
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
          transition: `transform ${transform.sec}s`,
        }}
        onMouseMove={handleMouseMove}
        onMouseOut={() => {
          // interacting 상태일 때만 초기화
          if (interacting === true) {
            setPointer({ x: 0, y: 0 });
            setTransform({
              sec: 1,
              rotateX: 0,
              rotateY: 0 + isTurn,
            });
          }
        }}
        onClick={activate}
        ref={cardRef}
      >
        <div
          className="card__glare"
          style={{
            backgroundImage: `
            radial-gradient(
            farthest-corner circle at ${overlayStyle.x} ${overlayStyle.y},
              hsla(0, 0%, 100%, 0.8) 10%,
              hsla(0, 0%, 100%, 0.65) 20%,
              hsla(0, 0%, 0%, 0) 90%
            )            
            `,
            opacity: pointer.x === 0 && pointer.y === 0 ? 0 : 0.8,
          }}
        ></div>
        <div className="card_back">
          <Image
            src={"/images/cards/card_back.png"}
            alt={"card_back"}
            width={340}
            height={490}
          />
        </div>
        <div className="card_front">
          <Image
            src={card.img}
            alt={card.player.name}
            width={340}
            height={490}
          />
        </div>
      </Card>
    </CardTransLater>
  );
};

export default PlayerCard;
const CardTransLater = styled.div`
  perspective: 600px;
  position: relative;
  width: auto;
  border-radius: 60px;
`;
const Card = styled.div`
  display: grid;
  will-change: transform, box-shadow;
  box-shadow: 0 0 3px -1px transparent, 0 0 2px 1px transparent,
    0 0 5px 0px transparent, 0px 10px 20px -5px black, 0 2px 15px -5px black,
    0 0 20px 0px transparent;
  border-radius: 15px;
  overflow: hidden;

  * {
    width: auto;
    height: auto;
    display: grid;
    grid-area: 1/1;
  }

  .card__glare {
    width: 100%;
    height: 100%;
    position: absolute;
    transform: translateZ(1.41px);
    overflow: hidden;
    mix-blend-mode: overlay;
    z-index: 1;
  }
`;
