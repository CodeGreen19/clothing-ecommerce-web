"use server";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const getDetailsProduct = async (productSlug: string) => {
  const product = await db.query.products.findFirst({
    where: eq(products.slug, productSlug),
    with: {
      sizeColorStockAndImage: {
        with: { colorAndStocks: { with: { images: true } } },
      },
    },
  });
  return product;
};
