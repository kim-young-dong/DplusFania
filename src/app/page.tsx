import Image from "next/image";
import PlayerCard from "@/components/PlayerCard";
import { GET_RANDOM_CARD } from "@/constant/card";

export default function Home() {
  const cardInfo = GET_RANDOM_CARD();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Welcome to Dplus Fania</h1>
      <PlayerCard
        card={{
          player: {
            name: cardInfo.player,
            position: cardInfo.position,
          },
          imgURL: cardInfo.imgURL,
        }}
      />
    </main>
  );
}
