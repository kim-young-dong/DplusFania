import { round, clamp, getRandomNumber } from "@/constant/math";

const PLAYERS = ["kingen", "lucid", "showmaker", "aiming", "kellin"];
const CARD_TYPES = [
  "blibli",
  "crystal",
  "dragon",
  "galaxy",
  "hero",
  "shape",
  "brown",
  "mint",
  "navy",
];
const GET_RANDOM_CARD = () => {
  const player = PLAYERS[getRandomNumber(PLAYERS.length - 1)];
  const type = CARD_TYPES[getRandomNumber(CARD_TYPES.length - 1)];
  return `/images/cards/${player}/card_${type}.png`;
};

export { PLAYERS, CARD_TYPES, GET_RANDOM_CARD };
