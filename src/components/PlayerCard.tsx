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
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  // 카드 회전 각도
  const cardTransform = useMemo(() => {
    if (coordinate.x === 0 && coordinate.y === 0) return { sec: 1, x: 0, y: 0 };
    return {
      sec: 0,
      x: (coordinate.y / 490) * 80 - 40,
      y: (coordinate.x / 340) * 80 - 40,
    };
  }, [coordinate]);

  // 광택 효과
  const overlayStyle = useMemo(() => {
    const percent = {
      x: clamp(round((100 / 340) * coordinate.x)),
      y: clamp(round((100 / 490) * coordinate.y)),
    };

    return {
      x: `${percent.x}%`,
      y: `${percent.y}%`,
    };
  }, [coordinate, cardRef.current]);

  // 마우스 이동 이벤트
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setCoordinate({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };
  return (
    <div
      style={{
        perspective: "500px",
      }}
    >
      <Card
        sec={cardTransform.sec}
        rotateX={cardTransform.x}
        rotateY={cardTransform.y}
        className="player_card"
        onMouseMove={handleMouseMove}
        onMouseOut={() => setCoordinate({ x: 0, y: 0 })}
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
            opacity: coordinate.x === 0 && coordinate.y === 0 ? 0 : 0.8,
          }}
        ></div>
        <div className="card_front">
          <Image
            src={card.img}
            alt={card.player.name}
            width={340}
            height={490}
          />
        </div>
        {/* <div className="card_back">
          <Image
            src={"/images/cards/card_back.png"}
            alt={"card_back"}
            width={340}
            height={490}
          />
        </div> */}
      </Card>
    </div>
  );
};

export default PlayerCard;

const Card = styled.div<{ sec: number; rotateX: number; rotateY: number }>`
  position: relative;
  transition: transform ${(props) => props.sec}s;
  transform: ${(props) =>
    `rotateX(${props.rotateX}deg) rotateY(${props.rotateY}deg)`};

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
