"use server";

import { db } from "@/drizzle/db";
import { products, sizes } from "@/drizzle/schema";
import { SortingState } from "@tanstack/react-table";
import { and, asc, count, desc, eq, ilike, SQL } from "drizzle-orm";
import { handleServerError } from "../../error";
import {
  CategoryFilterInfoType,
  DBSizeColorStockAndImagesType,
} from "../types";

// query
export const getProductsForTable = async ({
  limit,
  offset,
  search,
  sorting,
  categoryInfo,
}: {
  limit: number;
  offset: number;
  search?: string;
  sorting?: SortingState;
  categoryInfo?: CategoryFilterInfoType;
}) => {
  try {
    const productQuery = db
      .select({
        id: products.id,
        category: products.category,
        finalPrice: products.finalPrice,
        mainImgUrl: products.mainImgUrl,
        name: products.name,
        slug: products.slug,
        subCategory: products.subCategory,
        totalStock: products.totalStock,
      })
      .from(products);

    const conditions = [];
    if (search) {
      conditions.push(ilike(products.name, `%${search}%`));
    }
    if (categoryInfo?.category) {
      conditions.push(eq(products.category, categoryInfo.category));
    }
    if (categoryInfo?.sub_category) {
      conditions.push(ilike(products.subCategory, categoryInfo.sub_category));
    }
    if (conditions.length) {
      productQuery.where(and(...conditions));
    }

    if (sorting?.length) {
      let sortInfo: SQL<unknown> | null = null;
      if (sorting[0].id === "name") {
        sortInfo = sorting[0].desc ? desc(products.name) : asc(products.name);
      }
      if (sorting[0].id === "category") {
        sortInfo = sorting[0].desc
          ? desc(products.category)
          : asc(products.category);
      }
      if (sorting[0].id === "subCategory") {
        sortInfo = sorting[0].desc
          ? desc(products.subCategory)
          : asc(products.subCategory);
      }
      if (sorting[0].id === "totalStock" || sorting[0].id === "status") {
        sortInfo = sorting[0].desc
          ? desc(products.totalStock)
          : asc(products.totalStock);
      }
      if (sorting[0].id === "finalPrice") {
        sortInfo = sorting[0].desc
          ? desc(products.finalPrice)
          : asc(products.finalPrice);
      }

      if (sortInfo) {
        productQuery.orderBy(sortInfo);
      }
    } else {
      productQuery.orderBy(products.createdAt);
    }
    const allProducts = await productQuery.limit(limit).offset(offset);

    const [{ productCount }] = await db
      .select({ productCount: count() })
      .from(products)
      .where(and(...conditions));

    return {
      allProducts,
      productCount,
    };
  } catch (error) {
    return handleServerError(error);
  }
};

export const getSingleProductWithoutAsserts = async ({
  slug,
}: {
  slug: string;
}) => {
  try {
    const product = await db.query.products.findFirst({
      where: eq(products.slug, slug),
      with: { desBulletin: true },
    });
    if (!product) {
      return { error: "Product not found !" };
    }
    return { product };
  } catch (error) {
    return handleServerError(error);
  }
};

export const getSingleProductOnlyAsserts = async ({
  productId,
}: {
  productId: string | undefined;
}) => {
  try {
    if (!productId) {
      return { error: "product not found" };
    }
    const data: DBSizeColorStockAndImagesType[] = await db.query.sizes.findMany(
      {
        where: eq(sizes.productId, productId),
        with: { colorAndStocks: { with: { images: true } } },
      },
    );
    return { asserts: data };
  } catch (error) {
    return handleServerError(error);
  }
};
