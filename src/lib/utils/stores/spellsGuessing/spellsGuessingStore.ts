import { create } from "zustand";
import type { SpellsGuessingStoreType } from "./spellsGuessingStore.type";

export const SpellsGuessingStore = create<SpellsGuessingStoreType>((set) => ({
  spellImg: "",
  setSpellImg: (spellImg) => set({ spellImg })
}));