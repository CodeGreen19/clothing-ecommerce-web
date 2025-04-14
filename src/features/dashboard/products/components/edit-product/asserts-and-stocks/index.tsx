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

import toast from "react-hot-toast";
import SpinnerLoading from "../../../../shared/SpinnerLoading";
import { useGetProductAsserts } from "../../../hooks/products";
import { productSchema } from "../../../schema/products";
import { AddProductFormProps } from "../../../types";
import AssertsTable from "./AssertsTable";
import UpdateAssertsHeader from "./UpdateAssertHeader";

const AssertsAndStocks = ({
  form,
  productId,
}: AddProductFormProps & { productId: string }) => {
  // for existing data
  const { isPending, data: existData } = useGetProductAsserts({ productId });

  const [openModal, setOpenModal] = useState<boolean>(false);
  //
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <AlertDialog open={openModal}>
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
