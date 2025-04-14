import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { allPossibleColors, SizeColorStockAndImagesType } from "../types";

export const totalStockHelper = (
  data: SizeColorStockAndImagesType[],
): number => {
  return data.reduce(
    (sum, sizeItem) =>
      sum +
      sizeItem.otherInfo.reduce(
        (subSum, colorItem) => subSum + parseInt(colorItem.stock),
        0,
      ),
    0,
  );
};

export const convertToKebabCase = (str: string): string => {
  return str
    .toLowerCase() // Convert the string to lowercase
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, ""); // Optionally, remove any non-word characters
};

export const CompareSizesArray = ({
  allSizes,
  compareSizes,
}: {
  allSizes: AllPossibleSizesType[];
  compareSizes: AllPossibleSizesType[];
}): boolean => {
  if (compareSizes.length !== 5 || allSizes.length !== 5) return false;

  const set1 = new Set(allSizes);
  const set2 = new Set(compareSizes);
  return (
    set1.size === 5 &&
    set2.size === 5 &&
    [...set1].every((value) => set2.has(value))
  );
};

export const allColorsGenious = (
  existedSizes: string[],
  allSizes: allPossibleColors[],
): allPossibleColors[] => {
  const info = allSizes.filter((item) => !existedSizes.includes(item.name));
  return info;
};
