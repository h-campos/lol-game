import { randomSelect } from "@/lib/utils/functions/randomSelect";

export const getChampionsAssets = (champions: string[]): string => {
  const championsToShow = champions[randomSelect(champions)];
  const url = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/champion/${championsToShow}.png`;
  return url;
};