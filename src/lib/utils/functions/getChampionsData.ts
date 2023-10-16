import { randomSelect } from "@/lib/utils/functions/randomSelect";
import { extractChampionNameData } from "./extractChampionName";
import type { ChampionsDataType } from "@/config/types/championsData.type";
import type { SpellsEntity } from "@/config/types/championsData.type";

export const getChampionsDataUrl = (champions: string[]): string => {
  const championsData = champions[randomSelect(champions)];
  const url = `http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${championsData}.json`;
  return url;
};

export const getChampionsSpells = async(url: string): Promise<SpellsEntity[]> => {
  const champion = extractChampionNameData(url);
  const response = await fetch(url).then((res) => res.json()).then((data: ChampionsDataType) => data.data[champion].spells) as SpellsEntity[];
  return response;
};

export const getOneSpell = (spells: Array<SpellsEntity>): {spell: SpellsEntity; random: number} => {
  const random = randomSelect(spells);
  const spell = spells[random];
  return { spell, random };
};