import { randomSelect } from "@/lib/utils/functions/randomSelect";
import { extractChampionNameData } from "./extractChampionName";

export const getChampionsDataUrl = (champions: string[]): string => {
  const championsData = champions[randomSelect(champions)];
  const url = `http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${championsData}.json`;
  return url;
};

export const getChampionsSpells = async(url: string): Promise<any[]> => {
  const champion = extractChampionNameData(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  const response = await fetch(url).then((res) => res.json()).then((data) => data.data[champion].spells);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response;
};

export const getOneSpell = (spells: any[]): any => {
  const random = randomSelect(spells);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const spell = spells[random];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { spell, random };
};