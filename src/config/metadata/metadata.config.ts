import type { Metadata } from "next";

const data = {
  title: "LOL-GAME",
  description: [
    "LOL-GAME is a website thats allows you to test your knowledge about the game League of Legends.",
    "Try to be the best player of LOL-GAME and reach the top of the leaderboard."
  ].join(" "),
  siteName: "LOL-GAME"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lol-game.vercel.app/"),

  title: {
    template: "%s - " + data.title,
    default: data.title,
    absolute: data.title
  },
  description: data.description,
  applicationName: data.siteName,

  openGraph: {
    title: {
      template: "%s - " + data.title,
      default: data.title,
      absolute: data.title
    },
    description: data.description,
    siteName: data.siteName,
    url: "https://lol-game.vercel.app/",
    type: "website",
    images: ["/assets/metadata-preview.png"]
  },

  twitter: {
    title: {
      template: "%s - " + data.title,
      default: data.title,
      absolute: data.title
    },
    description: data.description
  }
};