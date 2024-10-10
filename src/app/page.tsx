import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/Discription";
import { getTodaysCard, CardProduct } from "@/actions/card";

export default async function Home() {
  const todaysCard: CardProduct | null = await getTodaysCard();

  return (
    <div className="flex flex-col items-center">
      <Description />
      <PlayerCard initialCard={todaysCard} />
    </div>
  );
}
