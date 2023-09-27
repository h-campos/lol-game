import { create } from "zustand";
import type { SheetChangelogStoreType } from "./sheetChangelogStore.type";

export const SheetChangelogStore = create<SheetChangelogStoreType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));