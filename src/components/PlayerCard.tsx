"use client";
import React, { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import style from "./styles/PlayerCard.module.css";
import styled from "styled-components";
import { round, clamp, getRandomNumber } from "@/constant/math";

interface Card {
  rank: number;
  player: {
    name: string;
    position: string;
  };
  img: string;
}

const PlayerCard = ({ card }: { card: Card }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState(card.img);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [interacting, setInteracting] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [transform, setTransform] = useState({
    sec: 0,
    rotateX: 0,
    rotateY: 0,
  });
  useEffect(() => {
    // 이미지 로딩 완료 시점
    if (cardRef.current) {
      setIsLoaded(true);
    }
  }, []);
  useEffect(() => {
    console.log(pointer, "pointer");
  }, [pointer]);

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

  // 마우스 인터렉션
  const interact = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interacting === false) return;
    const offsetX = event.nativeEvent.offsetX;
    const offsetY = event.nativeEvent.offsetY;
    setPointer({
      x: offsetX,
      y: offsetY,
    });

    setTransform({
      sec: 0,
      rotateX: round((offsetY / 490) * 80 - 40),
      rotateY: round((offsetX / 340) * 80 - 40 + rotateDelta.y),
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

  const popover = () => {
    setPointer({ x: 0, y: 0 });
    if (isActive === true) {
      setTransform({ sec: 1, rotateX: 0, rotateY: 0 });
    } else {
      setTransform({ sec: 1, rotateX: 0, rotateY: 360 });
    }
    setInteracting(false);
    setTimeout(() => {
      setImg("/images/cards/test/card_blibli.png");
    }, 300);
    setTimeout(() => {
      setInteracting(true);
    }, 1000);
  };
  // 클릭 이벤트
  const activate = () => {
    // active 상태 변경
    setIsActive((pre) => !pre);
    // pointer 초기화, 카드 회전
    popover();
  };
  // `
  //   --pointer-x: ${$springGlare.x}%;
  //   --pointer-y: ${$springGlare.y}%;
  //   --pointer-from-center: ${clamp(
  //     Math.sqrt(
  //       ($springGlare.y - 50) * ($springGlare.y - 50) +
  //         ($springGlare.x - 50) * ($springGlare.x - 50)
  //     ) / 50,
  //     0,
  //     1
  //   )};
  //   --pointer-from-top: ${$springGlare.y / 100};
  //   --pointer-from-left: ${$springGlare.x / 100};
  //   --glare-opacity: ${$springGlare.o};
  //   --rotate-x: ${$springRotate.x + $springRotateDelta.x}deg;
  //   --rotate-y: ${$springRotate.y + $springRotateDelta.y}deg;
  //   --background-x: ${$springBackground.x}%;
  //   --background-y: ${$springBackground.y}%;
  //   --card-scale: ${$springScale};
  //   --translate-x: ${$springTranslate.x}px;
  //   --translate-y: ${$springTranslate.y}px;
  // `;
  const dynamicStyles = {
    "--pointer-x": glareStyle.x,
    "--pointer-y": glareStyle.y,
    "--glare-opacity": glareStyle.o,
    "--rotate-x": `${transform.rotateX}deg`,
    "--rotate-y": `${transform.rotateY}deg`,
    "--transition-sec": `${transform.sec}s`,
  } as React.CSSProperties;
  return (
    <Card style={dynamicStyles}>
      <CardRotater
        ref={cardRef}
        className="card_rotater"
        // style={{
        //   transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        //   transition: `transform ${transform.sec}s`,
        // }}
        onMouseMove={interact}
        onMouseOut={interactEnd}
        onClick={activate}
      >
        <div className={style.shadow}></div>
        <Glare
          className="card__glare"
          // style={{
          //   backgroundImage: `
          //   radial-gradient(
          //   farthest-corner circle at var(--pointer-x) var(--pointer-y),
          //     hsla(0, 0%, 100%, 0.8) 10%,
          //     hsla(0, 0%, 100%, 0.65) 20%,
          //     hsla(0, 0%, 0%, 0) 90%
          //   )
          //   `,
          //   opacity: pointer.x === 0 && pointer.y === 0 ? 0 : 0.8,
          // }}
        ></Glare>

        <div
          className="card_back"
          style={{
            display: isLoaded ? "block" : "none",
          }}
        >
          <Image
            src={"/images/cards/card_back.png"}
            alt={"card_back"}
            width={340}
            height={475}
          />
        </div>
        <div className="card_front">
          <Image src={img} alt={card.player.name} width={340} height={475} />
        </div>
      </CardRotater>
    </Card>
  );
};

export default PlayerCard;

const Card = styled.div`
  perspective: 600px;
  position: relative;
  width: 340px;
  height: 490px;
`;
const CardRotater = styled.div`
  display: grid;
  perspective: 600px;
  /* will-change: transform visibility; */
  transform-style: preserve-3d;
  transform: rotateX(var(--rotate-x)) rotateY(var(--rotate-y));
  transition: all var(--transition-sec) ease;

  /* .shadow {
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 0 3px -1px transparent, 0 0 2px 1px transparent,
      0 0 5px 0px transparent, 0px 10px 20px -5px black, 0 2px 15px -5px black,
      0 0 20px 0px transparent;
  } */

  * {
    width: auto;
    height: auto;
    display: grid;
    grid-area: 1/1;
    transform-style: preserve-3d;
  }
  img {
    height: auto;
    -webkit-transform: translate3d(0px, 0px, 0.01px);
    transform: translate3d(0px, 0px, 0.01px);
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
  .card_front,
  .card_front * {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .card_back {
    /* -webkit-transform: rotateY(180deg) translateZ(1px);
    transform: rotateY(180deg) translateZ(10px); */
    -webkit-backface-visibility: visible;
    backface-visibility: visible;
  }
`;
const Glare = styled.div`
  background-image: radial-gradient(
    farthest-corner circle at var(--pointer-x) var(--pointer-y),
    hsla(0, 0%, 100%, 0.8) 10%,
    hsla(0, 0%, 100%, 0.65) 20%,
    hsla(0, 0%, 0%, 0) 90%
  );
  opacity: var(--glare-opacity);
`;
