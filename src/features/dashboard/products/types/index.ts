import { UseFormReturn } from "react-hook-form";
import { IconType } from "react-icons/lib";
import { InferSelectModel } from "drizzle-orm";
import { colorAndStocks, images, sizes } from "@/drizzle/schema";
import { productSchema } from "../schema/products";
import { z } from "zod";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { ALL_POSSIBLE_COLORS } from "../constants";

// interface

export interface AddProductFormProps {
  form: UseFormReturn<ProductSchemaType>;
}

// types
export type AppSideBarOptionsType = {
  sectionName: string;
  options: { title: string; url: string; icon: IconType }[];
};

export type ProductSchemaType = z.infer<typeof productSchema>;

export type ColorStockAndImagesType = {
  color: string;
  tailwind: string;
  stock: string;
  imageArr: File[];
};

export type SizeColorStockAndImagesType = {
  size: AllPossibleSizesType;
  otherInfo: ColorStockAndImagesType[];
};

export type CategoryFilterInfoType = {
  category: string;
  sub_category: string;
};

export type DBSizeColorStockAndImagesType = InferSelectModel<typeof sizes> & {
  colorAndStocks: (InferSelectModel<typeof colorAndStocks> & {
    images: InferSelectModel<typeof images>[];
  })[];
};

// table
type ProductPickedType = Pick<
  ProductSchemaType,
  "name" | "category" | "subCategory" | "totalStock"
>;

export type ProductListingTableType = ProductPickedType & {
  id: string;
  slug: string;
  finalPrice: number;
  mainImgUrl: string;
};

export type allPossibleColors = (typeof ALL_POSSIBLE_COLORS)[number];
