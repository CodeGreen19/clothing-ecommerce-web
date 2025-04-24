import { create } from "zustand";

type Store = {
  number: string;
  setNumber: (value: string) => void;
};
export const usePhoneNumber = create<Store>()((set) => ({
  number: "",
  setNumber: (value) => set({ number: value }),
}));

type LoginInfoStore = {
  number: string;
  setNumber: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
};

export const useLoingUserInfo = create<LoginInfoStore>()((set) => ({
  number: "",
  setNumber: (value) => set({ number: value }),
  email: "",
  setEmail: (value) => set({ email: value }),
}));
