import { create } from "zustand";
import type { BlurChampionStoreType } from "./blurChampionStore.type";

export const BlurChampionStore = create<BlurChampionStoreType>((set) => ({
  blurredChampion: "",
  setBlurredChampion: (blurredChampion) => set({ blurredChampion })
}));