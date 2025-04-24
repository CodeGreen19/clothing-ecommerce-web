// hooks/products.ts
import { useQuery } from "@tanstack/react-query";

import { handleSuccess } from "@/lib/helper";
import { SortingState } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";
import {
  getProductsForTable,
  getSingleProductWithoutAsserts,
} from "../server/product.query.action";
import { CategoryFilterInfoType, ProductSchemaType } from "../types";

export const useAllProductsForTable = ({
  pageIndex,
  pageSize,
  search,
  sorting,
  categoryInfo,
}: {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sorting?: SortingState;
  categoryInfo?: CategoryFilterInfoType;
}) => {
  return useQuery({
    queryKey: [
      "table_products",
      pageIndex,
      pageSize,
      search,
      sorting,
      categoryInfo,
    ],
    queryFn: async () => {
      const data = await getProductsForTable({
        limit: pageSize,
        offset: pageIndex * pageSize,
        search,
        sorting,
        categoryInfo,
      });
      if ("error" in data) {
        handleSuccess(data);
        return { allProducts: [], totalCount: 0 };
      } else {
        return {
          allProducts: data.allProducts,
          totalCount: data.productCount,
        };
      }
    },
  });
};

export const useProductWithoutAsserts = ({
  slug,
  form,
}: {
  slug: string;
  form: UseFormReturn<ProductSchemaType>;
}) => {
  return useQuery({
    queryKey: ["product_without_assert", slug],
    queryFn: async () => {
      const data = await getSingleProductWithoutAsserts({ slug });
      if ("error" in data) {
        handleSuccess(data);
        return { product: null };
      } else {
        form.setValue("name", data.product.name);
        form.setValue("description", data.product.description);
        form.setValue("qualification", data.product.qualification!);
        form.setValue("dseBulletin", data.product.desBulletin);
        form.setValue("category", data.product.category);
        form.setValue("subCategory", data.product.subCategory);
        form.setValue("material", data.product.material);
        setTimeout(() => {
          form.setValue("category", data.product.category);
          form.setValue("subCategory", data.product.subCategory);
          form.setValue("material", data.product.material);
        }, 1000);
        form.setValue("gender", data.product.gender);
        form.setValue("originalPrice", data.product.originalPrice.toString());
        form.setValue("givenPrice", data.product.givenPrice.toString());
        form.setValue(
          "discountInPercent",
          data.product.discountInPercent.toString(),
        );
        form.setValue("finalPrice", data.product.finalPrice.toString());
        form.setValue("totalStock", 1);
        form.setValue("insideDhakaDelevery", data.product.inDhakaPrice);
        form.setValue("outsideDhakaDelevery", data.product.outDhakaPrice);
        form.setValue("warranty", data.product.warranty);
        form.setValue("CODoption", data.product.codoptions);
        form.setValue("returnTime", data.product.returnTime);

        // todo:

        return { product: data.product };
      }
    },
  });
};
