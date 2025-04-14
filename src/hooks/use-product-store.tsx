import { create } from "zustand";

type Store = {
  submitTrigger: () => void;
  setSubmitTrigger: (fn: () => void) => void;
};

// Zustand store to store the function
export const useProductStore = create<Store>((set) => ({
  submitTrigger: () => {}, // Default empty function
  setSubmitTrigger: (fn) => set({ submitTrigger: fn }),
}));
