"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowBigRight } from "lucide-react";
import { useState } from "react";

import { handleSuccess } from "@/lib/helper";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import SpinnerLoading from "../../../../shared/SpinnerLoading";
import { productSchema } from "../../../schema/products";
import { getSingleProductOnlyAsserts } from "../../../server/product.query.action";
import { useEditColorStockImageStore } from "../../../store/use-product-edit";
import { AddProductFormProps } from "../../../types";
import AssertsTable from "./AssertsTable";
import UpdateAssertsHeader from "./UpdateAssertHeader";

const AssertsAndStocks = ({
  form,
  productId,
}: AddProductFormProps & { productId: string }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const {
    selectedSize,
    selectedSizeId,
    existedColorsOnSize,
    setDbSizeColorStockImgArr,
    setSelectedSize,
  } = useEditColorStockImageStore();
  const { isPending, data: existData } = useQuery({
    queryKey: ["asserts"],
    queryFn: async () => {
      const data = await getSingleProductOnlyAsserts({ productId });
      if ("error" in data) {
        handleSuccess(data);

        return { asserts: [] };
      } else {
        setDbSizeColorStockImgArr(data.asserts);
        setSelectedSize(data.asserts[0].size);
        return { asserts: data.asserts };
      }
    },
    enabled: openModal,
  });
  //
  const closeModal = () => {
    setOpenModal(false);
  };

  console.log("logged", selectedSize, selectedSizeId, existedColorsOnSize);

  return (
    <div>
      <AlertDialog
        onOpenChange={(e) => {
          if (e) {
            setOpenModal(true);
          } else {
            setOpenModal(false);
          }
        }}
        open={openModal}
      >
        <AlertDialogOverlay className="bg-black/5" />
        <AlertDialogTrigger
          className="m-0 p-0"
          onClick={() => {
            const data = form.getValues();
            const info = productSchema.safeParse(data);
            if (!info.success) {
              toast.error("All the field must be fill before editing asserts");
            } else {
              setOpenModal(true);
            }
          }}
        >
          <div className="flex w-[180px] cursor-pointer items-center justify-start gap-3 rounded-md border p-3 text-sm font-semibold text-pink-500 shadow-md hover:bg-pink-50/50">
            Asserts & Stocks
            <ArrowBigRight className="size-5 text-pink-500" />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="m-0 flex h-[90vh] max-w-[99vw] gap-0 overflow-y-auto bg-gray-50 p-4 md:max-w-[90vw]">
          <AlertDialogTitle></AlertDialogTitle>
          {isPending ? (
            <SpinnerLoading />
          ) : (
            <div className="h-full w-full">
              <UpdateAssertsHeader
                closeModal={closeModal}
                form={form}
                pending={false}
              />
              {existData?.asserts && (
                <AssertsTable
                  productId={productId}
                  asserts={existData?.asserts}
                  form={form}
                />
              )}
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AssertsAndStocks;
