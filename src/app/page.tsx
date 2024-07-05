import Link from "next/link";
import PlayerCard from "@/components/PlayerCard";
import Button from "@/components/Button";
import { GET_RANDOM_CARD } from "@/constant/card";

export default function Home() {
  const cardInfo = GET_RANDOM_CARD();
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome to Dplus Fania</h1>
        <div className=" flex flex-col justify-center items-center gap-8">
          <p className="text-xl">자신이 뽑은 카드를 컬렉션에 추가해보세요!</p>
          <Link href={"/sign-in"} className="w-full">
            <Button>로그인</Button>
          </Link>
        </div>
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
