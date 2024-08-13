import { getRandomNumber } from "@/constant/math";
interface CARD {
  name: string;
  player: {
    name: string;
    position: string;
  };
  imgURL: string;
}

const BUCKT_URL =
  "https://ncxbzukabsvxtmxrfwzx.supabase.co/storage/v1/object/public/player-card-bucket";
const PLAYERS = ["kingen", "lucid", "showmaker", "aiming", "kellin"];
const POSITIONS = ["TOP", "JUG", "MID", "BOT", "SUP"];
const CARD_TYPES = [
  "blibli",
  "crystal",
  "dragon",
  "galaxy",
  "hero",
  "shape",
  "brown",
  "normal",
  "navy",
];
const GET_RANDOM_CARD = () => {
  const player_name = PLAYERS[getRandomNumber(PLAYERS.length - 1)];
  const position = POSITIONS[PLAYERS.indexOf(player_name)];
  const type = CARD_TYPES[getRandomNumber(CARD_TYPES.length - 1)];

  const card_product: CARD = {
    name: `${type}_${player_name}`,
    player: {
      name: player_name,
      position: position,
    },
    imgURL: `${BUCKT_URL}/${player_name}/card_${type}.png`,
  };
  return card_product;
};

export { PLAYERS, CARD_TYPES, GET_RANDOM_CARD };
export type { CARD };
