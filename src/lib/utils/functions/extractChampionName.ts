export const extractChampionNameBlur = (champion: string): string => {
  const lastSlashIndex = champion.lastIndexOf("/");
  const pngIndex = champion.lastIndexOf(".png");
  const championName = champion.substring(lastSlashIndex + 1, pngIndex);
  return championName;
};

export const extractChampionNameData = (champion: string): string => {
  const lastSlashIndex = champion.lastIndexOf("/");
  const jsonIndex = champion.lastIndexOf(".json");
  const championName = champion.substring(lastSlashIndex + 1, jsonIndex);
  return championName;
};