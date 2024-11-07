import PlayerCard from "@/components/PlayerCard";
import Description from "@/components/Discription";

import {
  getTodaysCard,
  getRandomCard,
  getAllCards,
  CardProduct,
} from "@/actions/card";

async function getImages() {
  // DB에서 이미지 URL들을 가져오는 로직
  const images = await getAllCards();
  return images?.map((img) => img.imgURL);
}

export default async function Home() {
  const todaysCard: CardProduct | null = await getTodaysCard();
  const insertData: CardProduct = await getRandomCard();
  const imageUrls = (await getImages()) || [];

  return (
    <div className="text-center">
      <Description />
      <PlayerCard
        initialCard={todaysCard}
        rendomCard={insertData}
        images={imageUrls}
      />
    </div>
  );
}
