import { create } from "zustand";

type Store = {
  number: string;
  setNumber: (value: string) => void;
};
export const usePhoneNumber = create<Store>()((set) => ({
  number: "",
  setNumber: (value) => set({ number: value }),
}));
