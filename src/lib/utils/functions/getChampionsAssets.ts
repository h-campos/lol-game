import { randomSelect } from "@/lib/utils/functions/randomSelect";

export const getChampionsAssets = (champions: string[]): string => {
  const championsToShow = champions[randomSelect(champions)];
  const url = `http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${championsToShow}.png`;
  return url;
};

export const getChampionsAssetsWithName = (champions: string[], championName: string): string => {
  const url = `http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/${championName}.png`;
  return url;
};