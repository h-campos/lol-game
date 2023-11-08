import type { Items, ItemsData } from "@/config/types/itemsData.type";


export const getItemsData = async(): Promise<Items[]> => {
  const url = "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/item.json";
  return await fetch(url).then((res) => res.json()).then((data: ItemsData) => {
    if (data && data.data) {
      const itemsArray = Object.values(data.data);
      return itemsArray;
    } else {
      throw new Error("Données non valides ou manquantes");
    }
  });
};