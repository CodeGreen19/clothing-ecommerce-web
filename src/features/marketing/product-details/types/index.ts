import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { products } from "@/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type ProductType = InferSelectModel<typeof products>;

export type FullProduct = ProductType & {
  sizeColorStockAndImage: {
    id: string;
    size: AllPossibleSizesType;
    colorAndStocks: {
      id: string;
      color: string;
      tailwind: string;
      stock: number;
      images: {
        url: string;
      }[];
    }[];
  }[];
};
