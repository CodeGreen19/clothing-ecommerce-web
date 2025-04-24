import {
  ALL_PRODUCTS_SIZES,
  DELEVERY_OPTIONS,
  GENDERS,
  PRODUCT_QUALIFICATIONS,
  RETURN_OPTIONS,
  WARRANTY_OPTIONS,
} from "@/constants/dashboard";
import { default_img_url } from "@/data/upload-img";
import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelper";
import { cartItems } from "./cart";

export const GenderEnum = pgEnum("gender", GENDERS);
export const ProductQulificationEnum = pgEnum(
  "productQualification",
  PRODUCT_QUALIFICATIONS,
);
export const WarrantyEnum = pgEnum("warranty", WARRANTY_OPTIONS);
export const CashOnDeleveryEnum = pgEnum("cod_options", DELEVERY_OPTIONS);
export const ReturnTimeEnum = pgEnum("return_time", RETURN_OPTIONS);
export const SizesEnum = pgEnum("size", ALL_PRODUCTS_SIZES);

export const products = pgTable(
  "products",
  {
    id,
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    description: text("descriptions").notNull(),
    totalStock: integer("total_stock").notNull(),
    qualification: ProductQulificationEnum().notNull().array(),
    gender: GenderEnum().notNull(),
    category: text("category").notNull(),
    material: text("material").notNull(),
    subCategory: text("sub_category").notNull(),
    mainImgUrl: text("main_img_url").notNull().default(default_img_url),
    originalPrice: integer("original_price").notNull(),
    givenPrice: integer("given_price").notNull(),
    discountInPercent: integer("discount_percent").notNull(),
    finalPrice: integer("final_price").notNull(),
    inDhakaPrice: integer("dhaka_price").notNull(),
    outDhakaPrice: integer("out_dhaka_price").notNull(),
    warranty: WarrantyEnum().notNull(),
    codoptions: CashOnDeleveryEnum().notNull(),
    returnTime: ReturnTimeEnum().notNull(),
    createdAt,
    updatedAt,
  },
  (t) => [uniqueIndex("slug_idx").on(t.slug)],
);

export const productRelations = relations(products, ({ many }) => ({
  sizeColorStockAndImage: many(sizes),
  desBulletin: many(desBulletin),
  cartItems: many(cartItems),
}));

// ..............................sizes.....................................

export const sizes = pgTable("sizes", {
  id,
  size: SizesEnum().notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const sizesRelations = relations(sizes, ({ one, many }) => ({
  product: one(products, {
    fields: [sizes.productId],
    references: [products.id],
  }),
  colorAndStocks: many(colorAndStocks),
}));

// ..............................colors and stocks.....................................
export const colorAndStocks = pgTable("colors_and_stock", {
  id,
  color: text("color").notNull(),
  tailwind: text("tailwind").notNull(),
  stock: integer("stock").notNull(),
  sizeId: uuid("size_id")
    .notNull()
    .references(() => sizes.id, { onDelete: "cascade" }),
});
export const colorAndStockRelations = relations(
  colorAndStocks,
  ({ one, many }) => ({
    sizes: one(sizes, {
      fields: [colorAndStocks.sizeId],
      references: [sizes.id],
    }),
    images: many(images),
  }),
);

// ..............................images.....................................
export const images = pgTable("images", {
  id,
  secureUrl: text("secure_url").notNull(),
  publicId: text("public_id").notNull(),
  colorAndStockId: uuid("color_and_stock_id")
    .notNull()
    .references(() => colorAndStocks.id, { onDelete: "cascade" }),
});

export const imagesRelations = relations(images, ({ one }) => ({
  colorsAndStock: one(colorAndStocks, {
    fields: [images.colorAndStockId],
    references: [colorAndStocks.id],
  }),
}));

// ..............................des bulletin.....................................
export const desBulletin = pgTable("des_bulletin", {
  id,
  title: text("title").notNull(),
  text: text("text").notNull(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
});

export const desBulletinRelations = relations(desBulletin, ({ one }) => ({
  sizes: one(products, {
    fields: [desBulletin.productId],
    references: [products.id],
  }),
}));
