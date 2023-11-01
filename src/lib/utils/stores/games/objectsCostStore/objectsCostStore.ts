import { create } from "zustand";
import type { ObjectsCostStoreType } from "./objectsCostStore.type";

export const ObjectsCostStore = create<ObjectsCostStoreType>((set) => ({
  itemImg: "",
  setItemImg: (itemImg) => set({ itemImg }),
  itemPrice: "",
  setItemPrice: (itemPrice) => set({ itemPrice }),
  itemName: "",
  setItemName: (itemName) => set({ itemName })
}));