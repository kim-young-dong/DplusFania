import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/features/DashBoard/Discription";
import { getTodaysCard, randomCardPickup } from "./actions";
import userStore from "@/constant/auth";

export default async function DashBoard() {
  const CARD_DATA = await getTodaysCard();
  const user = userStore.getUser();

  if (!CARD_DATA) {
    await randomCardPickup();
  }

  return (
    <>
      <Description isSignedIn={!!user} />
      <p className="text-sm">카드를 클릭해보세요</p>
      <div className="flex flex-col items-center gap-2">
        <PlayerCard
          card={{
            imgURL: CARD_DATA?.imgURL,
          }}
        />
      </div>
    </>
  );
}
