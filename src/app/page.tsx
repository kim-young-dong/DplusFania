import Image from "next/image";
import PlayerCard from "@/components/PlayerCard";
import { GET_RANDOM_CARD } from "@/constant/card";

export default function Home() {
  const cardInfo = GET_RANDOM_CARD();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-5xl font-bold">Welcome to Dplus Fania</h1>
      <div className=" flex flex-col justify-center items-center gap-2">
        <h2 className="text-3xl font-bold">포토카드 뽑기</h2>
        <p className="text-xl">
          로그인하고 자신이 뽑은 포토카드를 컬렉션에 추가해보세요!
        </p>
        {/* <p>카카오로그인</p> */}
      </div>
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
    </main>
  );
}
