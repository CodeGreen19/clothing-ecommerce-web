import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { create } from "zustand";
import { SizeColorStockAndImagesType } from "../types";

type StoreState = {
  selectedSize: AllPossibleSizesType;

  setSelectedSize: (size: AllPossibleSizesType) => void;
  sizeColorStockImgArr: SizeColorStockAndImagesType[];
  setImageFiles: (
    size: AllPossibleSizesType,
    color: string,
    files: File[],
  ) => void;
  removeColorFromList: (size: AllPossibleSizesType, color: string) => void;
  removeSizeFromList: (size: AllPossibleSizesType) => void;
  setColorAndStock: (
    stock: string,
    color: string,
    tailwind: string,
    size: AllPossibleSizesType,
  ) => void;
  reset: () => void;
};

export const useSizeColorStockImgStore = create<StoreState>((set) => ({
  sizeColorStockImgArr: [],

  selectedSize: "XS",

  setSelectedSize: (size) =>
    set((state) => {
      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );

      let updatedArr = [];
      if (existingIndex !== -1) {
        // Update existing entry
        updatedArr = [...state.sizeColorStockImgArr];
        updatedArr[existingIndex] = { ...updatedArr[existingIndex], size };
      } else {
        // Add new entry
        updatedArr = [...state.sizeColorStockImgArr, { size, otherInfo: [] }];
      }

      return { sizeColorStockImgArr: updatedArr, selectedSize: size };
    }),
  setColorAndStock: (stock, color, tailwind, size) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];
      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );
      info = [...state.sizeColorStockImgArr];
      const existingSize = info[existingIndex];

      // existing color index
      const existingColorIndex = existingSize.otherInfo.findIndex(
        (item) => item.color === color,
      );
      const updateOtherInfo = [...existingSize.otherInfo];
      //same color image exists
      let sameColorImgArr: File[] = [];
      state.sizeColorStockImgArr.forEach((element) => {
        element.otherInfo.forEach((otherElement) => {
          if (
            otherElement.color === color &&
            otherElement.imageArr.length !== 0
          ) {
            sameColorImgArr = [...otherElement.imageArr];
          }
        });
      });

      if (existingColorIndex !== -1) {
        updateOtherInfo[existingColorIndex] = {
          ...updateOtherInfo[existingColorIndex],
          stock,
          imageArr: sameColorImgArr,
        };
      } else {
        updateOtherInfo.push({
          color,
          tailwind,
          imageArr: sameColorImgArr,
          stock,
        });
      }

      info[existingIndex] = {
        ...existingSize,
        size,
        otherInfo: updateOtherInfo,
      };

      return { sizeColorStockImgArr: info };
    }),
  setImageFiles: (size, color, files) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];
      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );
      info = [...state.sizeColorStockImgArr];
      const existingSize = info[existingIndex];

      // existing color index
      const existingColorIndex = existingSize.otherInfo.findIndex(
        (item) => item.color === color,
      );
      info[existingIndex].otherInfo[existingColorIndex].imageArr = files;
      state.sizeColorStockImgArr.forEach((element, index) => {
        element.otherInfo.forEach((otherElement, i) => {
          if (otherElement.color === color) {
            info[index].otherInfo[i].imageArr = files;
          }
        });
      });
      return { sizeColorStockImgArr: info };
    }),
  removeColorFromList: (size, color) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];

      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );
      info = [...state.sizeColorStockImgArr];
      const filteredInfo = info[existingIndex].otherInfo.filter(
        (item) => item.color !== color,
      );
      info[existingIndex].otherInfo = filteredInfo;

      return { sizeColorStockImgArr: info };
    }),
  removeSizeFromList: (size) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];
      info = [...state.sizeColorStockImgArr];
      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );
      info[existingIndex].otherInfo = [];
      return { sizeColorStockImgArr: info };
    }),
  reset: () => set({ sizeColorStockImgArr: [], selectedSize: "XS" }),
}));
