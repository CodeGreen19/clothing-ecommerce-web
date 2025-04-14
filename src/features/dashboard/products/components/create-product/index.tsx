"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { handleSuccess } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AddProduct from "./AddProduct";
import GeneralInfo from "./GeneralInfo";
import CategoryBox from "./CategoryBox";
import ProductPricing from "./ProductPricing";
import AdditionalInformations from "./AdditionalInformations";
import { useSizeColorStockImgStore } from "../../store/use-product-create";
import { ProductSchemaType } from "../../types";
import { productDefaultValue, productSchema } from "../../schema/products";
import SizeColorStockImg from "./size-color-stock-img";
import { createProduct } from "../../server/product.action";

const CreateProductForm = () => {
  const qc = useQueryClient();
  const { reset: storeReset } = useSizeColorStockImgStore();

  // create form
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValue,
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["products"]);
      if (info.message) {
        form.reset();
        storeReset();
      }
    },
  });

  // submit
  const handleSubmit = (value: ProductSchemaType) => {
    mutate(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <AddProduct reset={form.reset} pending={isPending} />
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="space-y-4 lg:mb-10">
            <GeneralInfo form={form} />
            <CategoryBox form={form} />
          </div>
          {/* right section */}
          <div className="space-y-4">
            <SizeColorStockImg form={form} />
            <ProductPricing form={form} />
            <AdditionalInformations form={form} />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default CreateProductForm;
