export const extractChampionName = (champion: string): string => {
  const lastSlashIndex = champion.lastIndexOf("/");
  const pngIndex = champion.lastIndexOf(".png");
  const championName = champion.substring(lastSlashIndex + 1, pngIndex);
  return championName;
};