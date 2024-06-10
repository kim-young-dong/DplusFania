"use client";
import React, { useState, useMemo, use } from "react";
import Image from "next/image";
import style from "./style/PlayerCard.module.css";

interface Player {
  name: string;
  position: string;
  image: string;
}

const PlayerCard = ({ player }: { player: Player }) => {
  const [coordinate, setCoordinate] = useState({ x: 0, y: 0 });
  // 카드 회전
  const rotateXY = useMemo(() => {
    if (coordinate.x === 0 && coordinate.y === 0) return { x: 0, y: 0 };
    return {
      x: (4 / 49) * coordinate.y - 20,
      y: (-2 / 17) * coordinate.x + 20,
    };
  }, [coordinate]);
  // 광택 효과
  const overlayStyle = useMemo(() => {
    return {
      backgroundPosition: `${coordinate.x / 5}% ${coordinate.y / 5}%`,
      filter: `opacity(${coordinate.x / 200}) brightness(1.2)`,
    };
  }, [coordinate]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      event.nativeEvent.offsetX > 10 &&
      event.nativeEvent.offsetY > 10 &&
      event.nativeEvent.offsetX < 330 &&
      event.nativeEvent.offsetY < 480
    ) {
      setCoordinate({
        x: event.nativeEvent.offsetX,
        y: event.nativeEvent.offsetY,
      });
    }
  };
  return (
    <>
      <div
        className="player-card"
        onMouseMove={handleMouseMove}
        onMouseOut={() => setCoordinate({ x: 0, y: 0 })}
        style={{
          transform: `rotateX(${rotateXY.x}deg) rotateY(${rotateXY.y}deg)`,
          perspective: "500px",
        }}
      >
        <div
          className={style.overlay}
          style={{
            backgroundPosition: overlayStyle.backgroundPosition,
            filter: overlayStyle.filter,
          }}
        ></div>
        <div className="card-img ">
          <Image
            src={`/images/players/player-${player.name}.png`}
            alt={player.name}
            width={340}
            height={490}
          />
        </div>
      </div>
      <h3>{player.name}</h3>
      <p>{player.position}</p>
    </>
  );
};

export default PlayerCard;
