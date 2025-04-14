"use server";

import { uploadImgToCloude } from "@/data/upload-img";
import { neon_db as db } from "@/drizzle/db";
import {
  colorAndStocks,
  desBulletin,
  images,
  products,
  sizes,
} from "@/drizzle/schema";
import { SortingState } from "@tanstack/react-table";
import { and, asc, count, desc, eq, ilike, SQL } from "drizzle-orm";
import { handleServerError } from "../../error";
import {
  convertToKebabCase,
  totalStockHelper,
} from "../../products/helpers/helper";
import {
  CategoryFilterInfoType,
  DBSizeColorStockAndImagesType,
  ProductSchemaType,
  SizeColorStockAndImagesType,
} from "../types";
import { productSchema } from "../schema/products";
import { UploadImgType } from "@/constants/dashboard/types";

// create
export const createProduct = async (productInfo: ProductSchemaType) => {
  return await db.transaction(async (tx) => {
    try {
      const { success, data } = productSchema.safeParse(productInfo);
      if (!success) {
        return { error: "products validation failed !" };
      }

      const colorAndImgArr = new Map<string, UploadImgType[]>();

      for (const sizeArr of data.sizeColorStockAndImage) {
        for (const colorAndImgs of sizeArr.otherInfo) {
          if (!colorAndImgArr.has(colorAndImgs.color)) {
            const images: UploadImgType[] = [];
            for (const imgFile of colorAndImgs.imageArr) {
              const imgData = await uploadImgToCloude(imgFile);
              images.push(imgData);
            }
            colorAndImgArr.set(colorAndImgs.color, images);
          }
        }
      }

      const {
        category,
        description,
        discountInPercent,
        dseBulletin,
        finalPrice,
        gender,
        givenPrice,
        material,
        name,
        originalPrice,
        qualification,
        sizeColorStockAndImage,
        totalStock,
        subCategory,
        CODoption,
        insideDhakaDelevery,
        outsideDhakaDelevery,
        returnTime,
        warranty,
      } = data;

      let firstImage = "";
      for (const info of colorAndImgArr) {
        if (!firstImage) {
          const imgArr = info[1];
          firstImage = imgArr[0].secure_url;
        }
      }

      const productName = name.trim();
      const productSlug = convertToKebabCase(productName);

      // creating product
      const [product] = await tx
        .insert(products)
        .values({
          category,
          description,
          originalPrice: Number(originalPrice),
          discountInPercent: Number(discountInPercent),
          finalPrice: Number(finalPrice),
          givenPrice: Number(givenPrice),
          gender,
          material,
          name: productName,
          slug: productSlug,
          qualification,
          subCategory,
          totalStock,
          codoptions: CODoption,
          returnTime,
          inDhakaPrice: Number(insideDhakaDelevery),
          outDhakaPrice: Number(outsideDhakaDelevery),
          warranty: warranty,
          mainImgUrl: firstImage,
        })
        .returning();

      // inserting bulletin
      for (let i = 0; i < dseBulletin.length; i++) {
        await tx.insert(desBulletin).values({
          productId: product.id,
          text: dseBulletin[i].text,
          title: dseBulletin[i].title,
        });
      }
      // inserting sizes
      for (const sizeAndOtherInfo of sizeColorStockAndImage) {
        const [size] = await tx
          .insert(sizes)
          .values({ productId: product.id, size: sizeAndOtherInfo.size })
          .returning();
        for (const otherInfo of sizeAndOtherInfo.otherInfo) {
          const [info] = await tx
            .insert(colorAndStocks)
            .values({
              sizeId: size.id,
              color: otherInfo.color,
              stock: Number(otherInfo.stock),
              tailwind: otherInfo.tailwind,
            })
            .returning();

          const imgArr = colorAndImgArr.get(otherInfo.color);
          if (imgArr) {
            for (const imgInfo of imgArr) {
              await tx.insert(images).values({
                colorAndStockId: info.id,
                publicId: imgInfo.public_id,
                secureUrl: imgInfo.secure_url,
              });
            }
          }
        }
      }

      return { message: "new product has created" };
    } catch (error) {
      return handleServerError(error);
    }
  });
};
// update
export const updateProductWithoutAsserts = async ({
  productInfo,
  previousSlug,
}: {
  productInfo: ProductSchemaType;
  previousSlug: string;
}) => {
  return await db.transaction(async (tx) => {
    try {
      const { success, data } = productSchema.safeParse(productInfo);
      if (!success) {
        return { error: "products validation failed !" };
      }

      const {
        category,
        description,
        discountInPercent,
        finalPrice,
        gender,
        givenPrice,
        material,
        name,
        originalPrice,
        qualification,
        subCategory,
        CODoption,
        insideDhakaDelevery,
        outsideDhakaDelevery,
        returnTime,
        warranty,
      } = data;
      const productName = name.trim();
      const productSlug = convertToKebabCase(productName);

      await tx
        .update(products)
        .set({
          category,
          description,
          originalPrice: Number(originalPrice),
          discountInPercent: Number(discountInPercent),
          finalPrice: Number(finalPrice),
          givenPrice: Number(givenPrice),
          gender,
          material,
          name: productName,
          slug: productSlug,
          qualification,
          subCategory,
          codoptions: CODoption,
          returnTime,
          inDhakaPrice: Number(insideDhakaDelevery),
          outDhakaPrice: Number(outsideDhakaDelevery),
          warranty: warranty,
        })
        .where(eq(products.slug, previousSlug));

      return { message: "Product has updated", newSlug: productSlug };
    } catch (error) {
      return handleServerError(error);
    }
  });
};
export const updateProductNewAsserts = async ({
  productInfo,
  productId,
}: {
  productInfo: ProductSchemaType;
  productId: string | undefined;
}) => {
  return await db.transaction(async (tx) => {
    try {
      const { success, data } = productSchema.safeParse(productInfo);
      if (!success) {
        return { error: "products validation failed !" };
      }

      if (!productId) {
        return { errro: "Product id is not found!" };
      }

      const colorAndImgArr = new Map<string, UploadImgType[]>();

      for (const sizeArr of data.sizeColorStockAndImage) {
        for (const colorAndImgs of sizeArr.otherInfo) {
          if (!colorAndImgArr.has(colorAndImgs.color)) {
            const images: UploadImgType[] = [];
            for (const imgFile of colorAndImgs.imageArr) {
              const imgData = await uploadImgToCloude(imgFile);
              images.push(imgData);
            }
            colorAndImgArr.set(colorAndImgs.color, images);
          }
        }
      }

      // inserting sizes
      for (const sizeAndOtherInfo of data.sizeColorStockAndImage) {
        const [size] = await tx
          .insert(sizes)
          .values({ productId, size: sizeAndOtherInfo.size })
          .returning();
        for (const otherInfo of sizeAndOtherInfo.otherInfo) {
          const [info] = await tx
            .insert(colorAndStocks)
            .values({
              sizeId: size.id,
              color: otherInfo.color,
              stock: Number(otherInfo.stock),
              tailwind: otherInfo.tailwind,
            })
            .returning();

          const imgArr = colorAndImgArr.get(otherInfo.color);
          if (imgArr) {
            for (const imgInfo of imgArr) {
              await tx.insert(images).values({
                colorAndStockId: info.id,
                publicId: imgInfo.public_id,
                secureUrl: imgInfo.secure_url,
              });
            }
          }
        }
      }

      // update stocks
      const addedStocks = totalStockHelper(data.sizeColorStockAndImage);
      const [info] = await tx
        .select({ existedStock: products.totalStock })
        .from(products)
        .where(eq(products.id, productId));
      await tx
        .update(products)
        .set({ totalStock: addedStocks + info.existedStock })
        .where(eq(products.id, productId));
      return { message: "Product asserts has updated" };

      ///
    } catch (error) {
      return handleServerError(error);
    }
  });
};
export const updateInProductExistedAsserts = async ({
  info,
  sizeId,
}: {
  sizeId: string;
  info: SizeColorStockAndImagesType[];
}) => {
  return await db.transaction(async (tx) => {
    try {
      const [size] = await tx.select().from(sizes).where(eq(sizes.id, sizeId));
      if (!size) {
        return { errro: "Size not found !" };
      }
      // inserting sizes
      if (info[0].size !== size.size) {
        return { error: "size not matched !" };
      }

      const colorAndImgArr = new Map<string, UploadImgType[]>();

      for (const obj of info[0].otherInfo) {
        const images: UploadImgType[] = [];
        for (const imgFile of obj.imageArr) {
          const imgData = await uploadImgToCloude(imgFile);
          images.push(imgData);
        }
        colorAndImgArr.set(obj.color, images);
      }

      for (const otherInfo of info[0].otherInfo) {
        const [info] = await tx
          .insert(colorAndStocks)
          .values({
            sizeId,
            color: otherInfo.color,
            stock: Number(otherInfo.stock),
            tailwind: otherInfo.tailwind,
          })
          .returning();

        const imgArr = colorAndImgArr.get(otherInfo.color);
        if (imgArr) {
          for (const imgInfo of imgArr) {
            await tx.insert(images).values({
              colorAndStockId: info.id,
              publicId: imgInfo.public_id,
              secureUrl: imgInfo.secure_url,
            });
          }
        }
      }

      const newStocks = totalStockHelper(info);
      const data = await tx
        .select({ totalStock: products.totalStock })
        .from(products)
        .where(eq(products.id, size.productId));
      await tx
        .update(products)
        .set({ totalStock: data[0].totalStock + newStocks })
        .where(eq(products.id, size.productId));
      return { message: "new data added" };
    } catch (error) {
      return handleServerError(error);
    }
  });
};

export const updateExistedStock = async ({
  colorId,
  newStock,
  productId,
  previousStock,
}: {
  colorId: string;
  productId: string;
  newStock: number;
  previousStock: number;
}) => {
  return await db.transaction(async (tx) => {
    try {
      // update stocks for products
      const [totalStock] = await tx
        .select({ stock: products.totalStock })
        .from(products)
        .where(eq(products.id, productId));
      const updatedStock = totalStock.stock - previousStock + newStock;
      await tx
        .update(products)
        .set({ totalStock: updatedStock })
        .where(eq(products.id, productId));

      // update stock to color
      await tx
        .update(colorAndStocks)
        .set({ stock: newStock })
        .where(eq(colorAndStocks.id, colorId));

      return { message: "Stock has updated" };
    } catch (error) {
      return handleServerError(error);
    }
  });
};

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

// delete
export const deleteProducts = async () => {
  try {
    await db.delete(products);
    return { message: "Product Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
