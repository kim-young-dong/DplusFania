import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/Discription";
import { getTodaysCard, getRandomCard, CardProduct } from "@/actions/card";

export default async function Home() {
  const todaysCard: CardProduct | null = (await getTodaysCard()) ?? null;
  const insertData: CardProduct = await getRandomCard();

  return (
    <div className="text-center">
      <Description />
      <PlayerCard initialCard={todaysCard} rendomCard={insertData} />
    </div>
  );
}
