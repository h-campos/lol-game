import { create } from "zustand";
import type { DialogGameStoreType } from "./dialogGameStore.type";

export const DialogGameStore = create<DialogGameStoreType>((set) => ({
  isOpen: false,
  toggle: (status: boolean) => set({ isOpen: status })
}));