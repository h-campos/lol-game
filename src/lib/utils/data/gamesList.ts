type GameList = {
  visualName: string;
  path: string;
  status: "available" | "unavailable" | "wip";
  databaseName: string;
}

export const gamesList: GameList[] = [
  {
    visualName: "Blurry Champions",
    path: "/app/blurry-champions",
    databaseName: "blurryChampions",
    status: "available"
  },
  {
    visualName: "Blurry Spells",
    path: "/app/blurry-spells",
    databaseName: "blurrySpells",
    status: "wip"
  }
];