import {
  ALL_PRODUCTS_SIZES,
  GENDERS,
  WARRANTY_OPTIONS,
  DELEVERY_OPTIONS,
  RETURN_OPTIONS,
  PRODUCT_QUALIFICATIONS,
} from "@/constants/dashboard";
import { ALL_POSSIBLE_COLORS } from "@/features/dashboard/products/constants";
import { ProductSchemaType } from "@/features/dashboard/products/types";

// Utility helpers
const randomFrom = <T>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
const randomFromMultiple = <T>(arr: readonly T[], min = 1, max = 3): T[] => {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const generateDummyProducts = (count: number): ProductSchemaType[] => {
  const dummyProducts: ProductSchemaType[] = [];

  for (let i = 0; i < count; i++) {
    const originalPrice = Math.floor(Math.random() * 4000 + 1000);
    const discount = Math.floor(Math.random() * 50);
    const finalPrice = Math.floor(
      originalPrice - (originalPrice * discount) / 100,
    );

    const product: ProductSchemaType = {
      name: `Product ${i + 1}`,
      description: `This is a high-quality product number ${i + 1} with unique features.`,
      material: randomFrom(["Cotton", "Silk", "Denim", "Leather", "Polyester"]),
      subCategory: randomFrom([
        "Summer",
        "Winter",
        "Formal",
        "Casual",
        "Festival",
      ]),
      category: randomFrom([
        "Clothing",
        "Outerwear",
        "Fashion",
        "Activewear",
        "Undergerment",
      ]),
      gender: randomFrom(GENDERS),
      totalStock: Math.floor(Math.random() * 200) + 10,
      warranty: randomFrom(WARRANTY_OPTIONS),
      CODoption: randomFrom(DELEVERY_OPTIONS),
      returnTime: randomFrom(RETURN_OPTIONS),
      insideDhakaDelevery: Math.floor(Math.random() * 150) + 30,
      outsideDhakaDelevery: Math.floor(Math.random() * 250) + 50,
      originalPrice: originalPrice.toString(),
      givenPrice: originalPrice.toString(),
      discountInPercent: discount.toString(),
      finalPrice: finalPrice.toString(),
      dseBulletin: [
        {
          title: "Why choose this?",
          text: "Built for comfort and style. Perfect for every occasion.",
        },
        {
          title: "Our promise",
          text: "Crafted with care and delivered with trust.",
        },
      ],
      qualification: randomFromMultiple(PRODUCT_QUALIFICATIONS, 2, 4),
      sizeColorStockAndImage: randomFromMultiple(ALL_PRODUCTS_SIZES, 1, 4).map(
        (size) => ({
          size,
          otherInfo: randomFromMultiple(ALL_POSSIBLE_COLORS, 1, 3).map(
            (colorObj) => ({
              color: colorObj.name,
              tailwind: colorObj.tailwind,
              stock: (Math.floor(Math.random() * 20) + 1).toString(),
              imageArr: [new File([], "dummy.jpg")],
            }),
          ),
        }),
      ),
    };

    dummyProducts.push(product);
  }

  return dummyProducts;
};
