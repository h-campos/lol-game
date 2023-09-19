import { create } from "zustand";
import type { AnswerBlurChampionStoreType } from "./answerBlurChampionStore.type";

export const AnswerBlurChampionStore = create<AnswerBlurChampionStoreType>((set) => ({
  answerBlurredChampion: "",
  setAnswerBlurredChampion: (answerBlurredChampion) => set({ answerBlurredChampion })
}));