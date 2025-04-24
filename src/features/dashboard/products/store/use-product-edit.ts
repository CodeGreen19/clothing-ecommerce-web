import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { create } from "zustand";
import {
  DBSizeColorStockAndImagesType,
  SizeColorStockAndImagesType,
} from "../types";

type StoreState = {
  selectedSize: AllPossibleSizesType;
  setSelectedSize: (size: AllPossibleSizesType) => void;
  selectedSizeId: string;
  setSelectedSizeId: (size: string) => void;
  existedColorsOnSize: string[];
  setExistedColorsOnSize: (colors: string[]) => void;
  sizeColorStockImgArr: SizeColorStockAndImagesType[];
  setImageFile: (
    size: AllPossibleSizesType,
    color: string,
    files: File[],
  ) => void;
  dbSizeColorStockImgArr: DBSizeColorStockAndImagesType[];
  setDbSizeColorStockImgArr: (info: DBSizeColorStockAndImagesType[]) => void;
  removeColorList: (size: AllPossibleSizesType, color: string) => void;
  removeSizeList: (size: AllPossibleSizesType) => void;
  setColorAndStock: (stock: string, color: string, tailwind: string) => void;
  reset: (size: AllPossibleSizesType) => void;
};

export const useEditColorStockImageStore = create<StoreState>((set) => ({
  sizeColorStockImgArr: [],
  selectedSize: "XS",
  selectedSizeId: "",

  dbSizeColorStockImgArr: [],

  setDbSizeColorStockImgArr: (info) => set({ dbSizeColorStockImgArr: info }),

  existedColorsOnSize: [],
  setExistedColorsOnSize: (info) => set({ existedColorsOnSize: info }),
  setSelectedSize: (s) =>
    set((state) => {
      const colors = [];
      const info = [...state.dbSizeColorStockImgArr];
      for (const data of info) {
        if (data.size === s) {
          for (const colorInfo of data.colorAndStocks) {
            colors.push(colorInfo.color);
          }
        }
      }

      return {
        selectedSize: s,
        existedColorsOnSize: colors,
      };
    }),
  setSelectedSizeId: (s) => set({ selectedSizeId: s }),

  setColorAndStock: (stock, color, tailwind) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];

      info = [...state.sizeColorStockImgArr];
      if (!info.length) {
        info.push({
          size: state.selectedSize,
          otherInfo: [],
        });
      }
      info[0].otherInfo.push({
        stock,
        color,
        imageArr: [],
        tailwind,
      });

      return { sizeColorStockImgArr: info };
    }),
  setImageFile: (size, color, files) =>
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
  removeColorList: (size, color) =>
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
  removeSizeList: (size) =>
    set((state) => {
      let info: SizeColorStockAndImagesType[] = [];
      info = [...state.sizeColorStockImgArr];
      const existingIndex = state.sizeColorStockImgArr.findIndex(
        (item) => item.size === size,
      );
      info[existingIndex].otherInfo = [];
      return { sizeColorStockImgArr: info };
    }),
  reset: (size) =>
    set({
      sizeColorStockImgArr: [],
      dbSizeColorStockImgArr: [],
      existedColorsOnSize: [],
      selectedSize: size,
    }),
}));
