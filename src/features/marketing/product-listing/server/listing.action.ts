"use server";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";

export const getListingProducts = async () => {
  return db
    .select({
      name: products.name,
      slug: products.slug,
      price: products.finalPrice,
      prevPrice: products.givenPrice,
      category: products.category,
      subCategory: products.subCategory,
    })
    .from(products)
    .limit(8)
    .orderBy(products.createdAt);
};
