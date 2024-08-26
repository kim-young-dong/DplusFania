import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/DashBoard/Discription";
import { getTodaysCard, CardProduct } from "@/actions/card";
import userStore from "@/constant/auth";

export default async function DashBoard() {
  const toDaysCard: CardProduct | null = await getTodaysCard();
  const user = await userStore.getUser();

  return (
    <>
      <Description isSignedIn={!!user} />
      <p className="text-sm">카드를 클릭해보세요</p>
      <PlayerCard initialCard={toDaysCard} />
    </>
  );
}
