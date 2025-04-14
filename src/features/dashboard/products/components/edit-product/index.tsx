"use client";

import { Form } from "@/components/ui/form";
import { handleSuccess } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HeadingAndActionsManual } from "../../../layout/HeadingAndActions";

import AdditionalInformations from "../create-product/AdditionalInformations";
import CategoryBox from "../create-product/CategoryBox";
import GeneralInfo from "../create-product/GeneralInfo";
import ProductPricing from "../create-product/ProductPricing";

import SpinnerLoading from "../../../shared/SpinnerLoading";
import UpdateProductHeader from "./UpdateProductHeader";
import AssertsAndStocks from "./asserts-and-stocks";
import { useProductWithoutAsserts } from "../../hooks/products";
import { ProductSchemaType } from "../../types";
import { productDefaultValue, productSchema } from "../../schema/products";
import { updateProductWithoutAsserts } from "../../server/product.action";

const EditProduct = () => {
  //
  const pathName = usePathname();
  const productName = pathName.split("/")[pathName.split("/").length - 1];
  const router = useRouter();
  //

  const qc = useQueryClient();
  // create form
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: productDefaultValue,
  });

  const { isPending: fetching_loading, data } = useProductWithoutAsserts({
    slug: productName,
    form: form,
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: updateProductWithoutAsserts,
    onSuccess: async (info) => {
      if ("newSlug" in info) {
        router.push(`/dashboard/products/edit/${info.newSlug}`);
      }
      await handleSuccess(info, qc, ["asserts"]);
    },
  });

  // submit
  const handleSubmit = (value: ProductSchemaType) => {
    mutate({ previousSlug: productName, productInfo: value });
  };

  return (
    <div>
      <HeadingAndActionsManual
        info={[
          { path: "Dashboard", url: "/dashboard" },
          { path: "Products", url: "/dashboard/products" },
          { path: "Edit", url: "/dashboard/products" },
          { path: productName, url: `/dashboard/products/edit/${productName}` },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <UpdateProductHeader reset={form.reset} pending={isPending} />
          {fetching_loading ? (
            <SpinnerLoading />
          ) : (
            <div>
              <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="space-y-4 lg:mb-10">
                  <GeneralInfo form={form} />
                  <CategoryBox form={form} />
                </div>
                {/* right section */}
                <div className="space-y-4">
                  {data?.product && (
                    <AssertsAndStocks
                      productId={data?.product?.id}
                      form={form}
                    />
                  )}
                  <ProductPricing form={form} />
                  <AdditionalInformations form={form} />
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditProduct;
