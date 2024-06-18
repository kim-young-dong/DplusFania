"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import style from "./style/PlayerCard.module.css";

interface Card {
  rank: number;
  player: {
    name: string;
    position: string;
  };
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
  const rotationDegree = useMemo(() => {
    if (coordinate.x === 0 && coordinate.y === 0) return { x: 0, y: 0 };
    return {
      x: (coordinate.y / 490) * 80 - 40,
      y: (coordinate.x / 340) * 80 - 40,
    };
  }, [coordinate]);

  // 카드 회전
  useEffect(() => {
    if (cardRef.current === null) return;
    cardRef.current.style.transition = `transform 0s`;
    // 초기 위치로 돌아갈 때 transition 효과
    if (coordinate.x === 0 && coordinate.y === 0) {
      cardRef.current.style.transition = `transform 1s`;
      cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
    } else {
      cardRef.current.style.transform = `rotateX(${rotationDegree.x}deg) rotateY(${rotationDegree.y}deg)`;
    }
  }, [cardRef, coordinate, rotationDegree.x, rotationDegree.y]);

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
      <div
        className="player_card"
        onMouseMove={handleMouseMove}
        onMouseOut={() => setCoordinate({ x: 0, y: 0 })}
        ref={cardRef}
      >
        <div
          className={style.card__glare}
          style={{
            backgroundImage: `
            radial-gradient(
            farthest-corner circle at ${overlayStyle.x} ${overlayStyle.y},
              hsla(0, 0%, 100%, 0.6) 10%,
              hsla(0, 0%, 100%, 0.45) 25%,
              hsla(0, 0%, 0%, 0) 50%
            )            
            `,
            opacity: coordinate.x === 0 && coordinate.y === 0 ? 0 : 0.8,
          }}
        ></div>
        <div className="card_front">
          <Image
            src={`/images/cards/${card.rank}/${card.player.name}.png`}
            alt={card.player.name}
            width={340}
            height={490}
          />
        </div>
      </div>
      {/* 또 다른 버전. */}
      <div className="card_front w-full h-full absolute">
        <Image
          src={`/images/testbg.png`}
          alt={card.player.name}
          width={340}
          height={490}
          className="w-full h-full absolute"
        />
        <Image
          src={`/images/players/player-lucid.png`}
          alt={card.player.name}
          width={340}
          height={490}
          className="w-full h-full absolute z-10"
        />
        <div
          className={style.card__glare}
          style={{
            backgroundImage: `
            radial-gradient(
            farthest-corner circle at ${overlayStyle.x} ${overlayStyle.y},
              hsla(0, 0%, 100%, 0.8) 10%,
              hsla(0, 0%, 100%, 0.65) 20%,
              hsla(0, 0%, 0%, 0) 50%

            )            
            `,
            opacity: coordinate.x === 0 && coordinate.y === 0 ? 0 : 1,
          }}
        ></div>
      </div>
    </div>
  );
};

export default PlayerCard;
