type GameList = {
  visualName: string;
  path: string;
  status: "available" | "unavailable" | "wip";
}

export const gamesList: GameList[] = [
  {
    visualName: "Blurry Champions",
    path: "blurry-champions",
    status: "available"
  },
  {
    visualName: "Blurry Spells",
    path: "blurry-spells",
    status: "wip"
  }
];