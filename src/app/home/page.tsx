"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PlayerCard from "@/components/PlayerCard";
import Button from "@/components/Button";
import { GET_RANDOM_CARD } from "@/constant/card";

export default function HomePage() {
  useEffect(() => {}, []);
  const cardInfo = GET_RANDOM_CARD();

  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold">오늘의 카드</h1>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p>Click to Card</p>
        <PlayerCard
          card={{
            player: {
              name: cardInfo.player,
              position: cardInfo.position,
            },
            imgURL: cardInfo.imgURL,
          }}
        />
      </div>
    </>
  );
}
