import { champions } from "../data-lol/champions";

export const championsExist = (champion: string): boolean => {
  const championExist = champions.find((championData) => championData === champion);
  return championExist ? true : false;
};