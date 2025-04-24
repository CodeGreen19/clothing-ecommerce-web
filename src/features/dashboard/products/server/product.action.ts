"use server";

import { UploadImgType } from "@/constants/dashboard/types";
import { deleteImgToCloude, uploadImgToCloude } from "@/data/upload-img";
import { db } from "@/drizzle/db";
import {
  colorAndStocks,
  desBulletin,
  images,
  products,
  sizes,
} from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { handleServerError } from "../../error";
import {
  convertToKebabCase,
  totalStockHelper,
} from "../../products/helpers/helper";
import { productSchema } from "../schema/products";
import { ProductSchemaType, SizeColorStockAndImagesType } from "../types";

// create
export const createProduct = async (productInfo: ProductSchemaType) => {
  try {
    const { success, data } = productSchema.safeParse(productInfo);
    if (!success) {
      return { error: "products validation failed !" };
    }
    if (!data.sizeColorStockAndImage.length) {
      return { message: "Updating Asserts & Stocks is Required" };
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
    const [product] = await db
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
      await db.insert(desBulletin).values({
        productId: product.id,
        text: dseBulletin[i].text,
        title: dseBulletin[i].title,
      });
    }
    // inserting sizes
    for (const sizeAndOtherInfo of sizeColorStockAndImage) {
      const [size] = await db
        .insert(sizes)
        .values({ productId: product.id, size: sizeAndOtherInfo.size })
        .returning();
      for (const otherInfo of sizeAndOtherInfo.otherInfo) {
        const [info] = await db
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
            await db.insert(images).values({
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
};

export const addNewImageToExistedStockAndColor = async ({
  colorAndStockId,
  imageFile,
}: {
  imageFile: File;
  colorAndStockId: string;
}) => {
  try {
    const { public_id, secure_url } = await uploadImgToCloude(imageFile);
    await db.insert(images).values({
      colorAndStockId,
      publicId: public_id,
      secureUrl: secure_url,
    });
    return { message: "Image Added" };
  } catch (error) {
    return handleServerError(error);
  }
};
// update
export const updateProductWithoutAsserts = async ({
  productInfo,
  previousSlug,
}: {
  productInfo: ProductSchemaType;
  previousSlug: string;
}) => {
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

    await db
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
};

export const updateProductNewAsserts = async ({
  productInfo,
  productId,
}: {
  productInfo: ProductSchemaType;
  productId: string | undefined;
}) => {
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
      const [size] = await db
        .insert(sizes)
        .values({ productId, size: sizeAndOtherInfo.size })
        .returning();
      for (const otherInfo of sizeAndOtherInfo.otherInfo) {
        const [info] = await db
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
            await db.insert(images).values({
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
    const [info] = await db
      .select({ existedStock: products.totalStock })
      .from(products)
      .where(eq(products.id, productId));
    await db
      .update(products)
      .set({ totalStock: addedStocks + info.existedStock })
      .where(eq(products.id, productId));
    return { message: "Product asserts has updated" };

    ///
  } catch (error) {
    return handleServerError(error);
  }
};
export const updateInProductExistedAsserts = async ({
  info,
  sizeId,
}: {
  sizeId: string;
  info: SizeColorStockAndImagesType[];
}) => {
  try {
    const [size] = await db.select().from(sizes).where(eq(sizes.id, sizeId));
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
      const [info] = await db
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
          await db.insert(images).values({
            colorAndStockId: info.id,
            publicId: imgInfo.public_id,
            secureUrl: imgInfo.secure_url,
          });
        }
      }
    }

    const newStocks = totalStockHelper(info);
    const data = await db
      .select({ totalStock: products.totalStock })
      .from(products)
      .where(eq(products.id, size.productId));
    await db
      .update(products)
      .set({ totalStock: data[0].totalStock + newStocks })
      .where(eq(products.id, size.productId));
    return { message: "new data added" };
  } catch (error) {
    return handleServerError(error);
  }
};

export const updateExistedStock = async ({
  colorId,
  newStock,
  productSlug,
  previousStock,
}: {
  colorId: string;
  productSlug: string;
  newStock: number;
  previousStock: number;
}) => {
  try {
    // update stocks for products
    const [totalStock] = await db
      .select({ stock: products.totalStock })
      .from(products)
      .where(eq(products.slug, productSlug));
    const updatedStock = totalStock.stock - previousStock + newStock;
    await db
      .update(products)
      .set({ totalStock: updatedStock })
      .where(eq(products.slug, productSlug));

    // update stock to color
    await db
      .update(colorAndStocks)
      .set({ stock: newStock })
      .where(eq(colorAndStocks.id, colorId));

    return { message: "Stock has updated" };
  } catch (error) {
    return handleServerError(error);
  }
};
export const exchangeExistedImage = async ({
  publicId,
  colorAndStockId,
  imgFile,
  imgId,
}: {
  publicId: string;
  imgFile: File;
  colorAndStockId: string;
  imgId: string;
}) => {
  try {
    await deleteImgToCloude(publicId);
    const { public_id, secure_url } = await uploadImgToCloude(imgFile);
    await db
      .delete(images)
      .where(
        and(eq(images.colorAndStockId, colorAndStockId), eq(images.id, imgId)),
      );
    await db.insert(images).values({
      colorAndStockId,
      publicId: public_id,
      secureUrl: secure_url,
    });

    return { message: "Image Exhanged" };
  } catch (error) {
    return handleServerError(error);
  }
};
export const addMoreColorsToSize = async ({
  info,
  productId,
}: {
  info: SizeColorStockAndImagesType;
  productId: string;
}) => {
  try {
    if (!info.otherInfo) {
      return { message: "Updating Asserts & Stocks is Required" };
    }

    const colorAndImgArr = new Map<string, UploadImgType[]>();

    for (const colorAndImgs of info.otherInfo) {
      if (!colorAndImgArr.has(colorAndImgs.color)) {
        const images: UploadImgType[] = [];
        for (const imgFile of colorAndImgs.imageArr) {
          const imgData = await uploadImgToCloude(imgFile);
          images.push(imgData);
        }
        colorAndImgArr.set(colorAndImgs.color, images);
      }
    }

    let newStocks: number = 0;
    // inserting sizes
    const [size] = await db
      .select()
      .from(sizes)
      .where(and(eq(sizes.size, info.size), eq(sizes.productId, productId)));
    if (!size) {
      return { error: "Error occurs" };
    }
    for (const otherInfo of info.otherInfo) {
      const [info] = await db
        .insert(colorAndStocks)
        .values({
          sizeId: size.id,
          color: otherInfo.color,
          stock: Number(otherInfo.stock),
          tailwind: otherInfo.tailwind,
        })
        .returning();
      newStocks += Number(otherInfo.stock);

      const imgArr = colorAndImgArr.get(otherInfo.color);
      if (imgArr) {
        for (const imgInfo of imgArr) {
          await db.insert(images).values({
            colorAndStockId: info.id,
            publicId: imgInfo.public_id,
            secureUrl: imgInfo.secure_url,
          });
        }
      }
    }
    // update stocks
    const [{ totalStock }] = await db
      .select({ totalStock: products.totalStock })
      .from(products)
      .where(eq(products.id, productId));
    await db
      .update(products)
      .set({ totalStock: totalStock + newStocks })
      .where(eq(products.id, productId));

    return { message: "New Color with Images has added" };
  } catch (error) {
    return handleServerError(error);
  }
};
// delete
export const deleteExistedImage = async ({ imgId }: { imgId: string }) => {
  try {
    await db.delete(images).where(eq(images.id, imgId));
    // todo : delete form cloude also

    return { message: "Image Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
export const deleteColorOfSpecifiedSize = async ({
  productId,
  colorAndStockId,
}: {
  productId: string;
  colorAndStockId: string;
}) => {
  try {
    const [{ stock }] = await db
      .select({ stock: colorAndStocks.stock })
      .from(colorAndStocks)
      .where(eq(colorAndStocks.id, colorAndStockId));
    const [{ totalStock }] = await db
      .select({ totalStock: products.totalStock })
      .from(products)
      .where(eq(products.id, productId));

    await db
      .delete(colorAndStocks)
      .where(eq(colorAndStocks.id, colorAndStockId));

    await db
      .update(products)
      .set({ totalStock: totalStock - stock })
      .where(eq(products.id, productId));

    // delete images
    const imagesInfo = await db
      .select({ publicId: images.publicId })
      .from(images)
      .where(eq(images.colorAndStockId, colorAndStockId));
    for (const data of imagesInfo) {
      await deleteImgToCloude(data.publicId);
    }

    return { message: "Color Item Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
export const deleteSpecifiedSize = async ({
  productId,
  sizeId,
}: {
  productId: string;
  sizeId: string;
}) => {
  try {
    const info = await db
      .select()
      .from(colorAndStocks)
      .where(eq(colorAndStocks.sizeId, sizeId));
    const delTotalStock = info.reduce((sum, item) => sum + item.stock, 0);

    const [{ totalStock }] = await db
      .select({ totalStock: products.totalStock })
      .from(products)
      .where(eq(products.id, productId));

    await db
      .update(products)
      .set({ totalStock: totalStock - delTotalStock })
      .where(eq(products.id, productId));

    // extracting for deleting images
    const colorAndStockInfo = await db
      .select({ colorAndStockId: colorAndStocks.id })
      .from(colorAndStocks)
      .where(eq(colorAndStocks.sizeId, sizeId));

    for (const { colorAndStockId } of colorAndStockInfo) {
      // delete images
      const imagesInfo = await db
        .select({ publicId: images.publicId })
        .from(images)
        .where(eq(images.colorAndStockId, colorAndStockId));
      for (const data of imagesInfo) {
        await deleteImgToCloude(data.publicId);
      }
    }

    // delete the size
    await db.delete(sizes).where(eq(sizes.id, sizeId));
    return { message: "Color Item Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
export const deleteProduct = async ({ productId }: { productId: string }) => {
  try {
    const imagesInfo = await db
      .selectDistinct({ publicId: images.publicId })
      .from(images)
      .innerJoin(colorAndStocks, eq(images.colorAndStockId, colorAndStocks.id))
      .innerJoin(sizes, eq(colorAndStocks.sizeId, sizes.id))
      .where(eq(sizes.productId, productId));

    const imagesPublicIdArr = imagesInfo.map((img) => img.publicId);
    // todo: delete those public id from cloude
    console.log(imagesPublicIdArr, "lsdfa");

    // delete the size
    await db.delete(products).where(eq(products.id, productId));
    return { message: "Product Deleted" };
  } catch (error) {
    return handleServerError(error);
  }
};
