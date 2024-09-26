import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/DashBoard/Discription";
import { getTodaysCard, getRandomCard, CardProduct } from "@/actions/card";
import userStore from "@/constant/auth";

export default async function DashBoard() {
  const user = await userStore.getUser();
  const todaysCard: CardProduct | null = await getTodaysCard();

  return (
    <div className="flex flex-col items-center">
      <Description />
      <PlayerCard todaysCard={todaysCard} isSignedIn={!!user} />
    </div>
  );
}
