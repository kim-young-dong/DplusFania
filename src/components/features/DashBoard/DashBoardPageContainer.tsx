import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/features/DashBoard/Discription";
import { useUserInfo } from "@/utils/hook/useUserInfo";
import { GET_RANDOM_CARD } from "@/constant/card";

export default async function DashBoard() {
  const cardInfo = GET_RANDOM_CARD();
  const randomCardPickup = async () => {};
  const user = useUserInfo();

  return (
    <>
      <Description isSignedIn={!!user} />
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
