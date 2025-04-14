import { create } from "zustand";

type StoreState = {
  selectedCategory: string;
  setSelectedCategory: (info: string) => void;
  selectedSubCategory: string;
  setSelectedSubCategory: (info: string) => void;
};

export const useFiltereProductStore = create<StoreState>((set) => ({
  selectedCategory: "",
  setSelectedCategory: (info) =>
    set({ selectedCategory: info, selectedSubCategory: "" }),
  selectedSubCategory: "",
  setSelectedSubCategory: (info) => set({ selectedSubCategory: info }),
}));
