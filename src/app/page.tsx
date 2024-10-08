import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/Discription";
import { getTodaysCard, CardProduct } from "@/actions/card";
import { getUser } from "@/actions/auth";

export default async function Home() {
  const user = await getUser();
  const todaysCard: CardProduct | null = await getTodaysCard();

  return (
    <div className="flex flex-col items-center">
      <Description />
      <PlayerCard todaysCard={todaysCard} isSignedIn={!!user} />
    </div>
  );
}
