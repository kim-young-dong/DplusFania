import { round, clamp, getRandomNumber } from "@/constant/math";

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
  "mint",
  "navy",
];
const GET_RANDOM_CARD = () => {
  const player = PLAYERS[getRandomNumber(PLAYERS.length - 1)];
  const position = POSITIONS[PLAYERS.indexOf(player)];
  const type = CARD_TYPES[getRandomNumber(CARD_TYPES.length - 1)];
  return {
    player,
    position,
    imgURL: `/images/cards/${player}/card_${type}.png`,
  };
};

export { PLAYERS, CARD_TYPES, GET_RANDOM_CARD };
