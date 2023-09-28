import { create } from "zustand";
import type { DialogReportProposalStoreType } from "./dialogReportProposalStore.type";

export const DialogReportProposalStore = create<DialogReportProposalStoreType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));