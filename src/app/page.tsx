import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/Discription";
import { GET_RANDOM_CARD } from "@/constant/card";
import { cookies } from "next/headers";
import { $supabase } from "@/app/lib/supabase";

export default async function Home() {
  const cardInfo = GET_RANDOM_CARD();

  const getUser = async () => {
    const token = cookies().get("access_token");

    try {
      const {
        data: { user },
      } = await $supabase.auth.getUser(token?.value);

      return user;
    } catch (error) {
      return null;
    }
  };
  const user = await getUser();

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
