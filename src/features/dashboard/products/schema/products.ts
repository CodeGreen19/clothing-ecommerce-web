import { z } from "zod";
import {
  GENDERS,
  PRODUCT_QUALIFICATIONS,
  WARRANTY_OPTIONS,
  DELEVERY_OPTIONS,
  RETURN_OPTIONS,
  ALL_PRODUCTS_SIZES,
} from "@/constants/dashboard";
import { ProductSchemaType } from "../types";

const genderEnum = z.enum(GENDERS);
const ProductQulificationEnum = z.enum(PRODUCT_QUALIFICATIONS).array();
const WarrantyEnum = z.enum(WARRANTY_OPTIONS);
const CashOnDeleveryEnum = z.enum(DELEVERY_OPTIONS);
const ReturnTimeEnum = z.enum(RETURN_OPTIONS);
const SizesEnum = z.enum(ALL_PRODUCTS_SIZES);

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Descriptions is required"),
  material: z.string().min(1, "Materials is required"),
  subCategory: z.string().min(1, "Sub Category is required"),
  category: z.string().min(1, "Category is required"),
  gender: genderEnum,
  totalStock: z.number().min(1, "Total Stock is required"),
  warranty: WarrantyEnum,
  CODoption: CashOnDeleveryEnum,
  returnTime: ReturnTimeEnum,
  insideDhakaDelevery: z.number().min(1, "Required"),
  outsideDhakaDelevery: z.number().min(1, "Required"),

  originalPrice: z
    .string()
    .min(1, "Original price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Original price must be a valid number",
    ),

  givenPrice: z
    .string()
    .min(1, "Given price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Given price must be a valid number",
    ),
  discountInPercent: z
    .string()
    .min(1, "Discount price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Discount price must be a valid number",
    ),
  finalPrice: z
    .string()
    .min(1, "Final price is required")
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Final price must be a valid number",
    ),

  dseBulletin: z.array(z.object({ title: z.string(), text: z.string() })),
  qualification: ProductQulificationEnum,
  sizeColorStockAndImage: z.array(
    z.object({
      size: SizesEnum,
      otherInfo: z.array(
        z.object({
          color: z.string(),
          tailwind: z.string(),
          stock: z.string().min(1, "give a minimun stock, not 0"),
          imageArr: z.array(z.instanceof(File)),
        }),
      ),
    }),
  ),
});

export const productDefaultValue: ProductSchemaType = {
  name: "",
  description: "",
  dseBulletin: [],
  totalStock: 0,
  qualification: [],
  gender: "Unisex",
  category: "",
  material: "",
  subCategory: "",
  sizeColorStockAndImage: [],
  originalPrice: "",
  givenPrice: "",
  discountInPercent: "",
  finalPrice: "",
  CODoption: "Available",
  returnTime: "7 days",
  warranty: "Not available",
  insideDhakaDelevery: 60,
  outsideDhakaDelevery: 120,
};
