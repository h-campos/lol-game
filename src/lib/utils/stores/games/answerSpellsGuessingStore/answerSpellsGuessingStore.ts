import { create } from "zustand";
import type { AnswerSpellsGuessingStoreType } from "./answerSpellsGuessingStore.type";

export const AnswerSpellsGuessingStore = create<AnswerSpellsGuessingStoreType>((set) => ({
  answerChampion: "",
  setAnswerChampion: (answerChampion) => set({ answerChampion }),
  answerSpell: "",
  setAnswerSpell: (answerSpell) => set({ answerSpell })
}));