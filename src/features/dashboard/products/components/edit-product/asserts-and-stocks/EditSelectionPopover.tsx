"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import ProductSecHeading from "@/features/dashboard/products/components/shared/headings";
import { PopoverClose } from "@radix-ui/react-popover";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useEditColorStockImageStore } from "../../../store/use-product-edit";
import EditImgUploadAndLists from "./EditImgUploadAndLists";
import EditSubSelectionPopover from "./EditSubSelectionPopover";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMoreColorsToSize } from "../../../server/product.action";
import { handleSuccess } from "@/lib/helper";

const EditSelectionPopover = ({
  side = "bottom",
  children,
  productId,
}: {
  side?: "bottom" | "right";
  children: ReactNode;
  productId: string;
}) => {
  // hooks
  const qc = useQueryClient();
  const { sizeColorStockImgArr, selectedSize, reset } =
    useEditColorStockImageStore();
  //states
  const [error, setError] = useState("");
  // refs
  const popoverCloseRef = useRef<HTMLButtonElement | null>(null);

  // update color mutattion
  const { isPending, mutate } = useMutation({
    mutationFn: addMoreColorsToSize,
    onSuccess: async (info) => {
      if (info.message) {
        reset(selectedSize);
      }
      await handleSuccess(info, qc, ["asserts"]);
    },
  });

  // submit
  const handleConfirm = () => {
    const info = sizeColorStockImgArr.filter(
      (element) => element.otherInfo.length !== 0,
    );

    const hasError = info.some((element) =>
      element.otherInfo.some((subElement) => {
        if (subElement.imageArr.length === 0) {
          setError("Each color requires at least one image !");
          return true; // Stops execution
        }
        return false;
      }),
    );

    if (hasError) return;

    console.log("info", info);

    // update here todo:

    mutate({ info: sizeColorStockImgArr[0], productId });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000); // remove error after 4 seconds
    }
  }, [error]);

  const donotHaveAnything =
    sizeColorStockImgArr.length !== 0 &&
    sizeColorStockImgArr[0].otherInfo.length !== 0 &&
    sizeColorStockImgArr[0].otherInfo[0].imageArr.length !== 0
      ? false
      : true;

  return (
    <Popover
      onOpenChange={(e) => {
        if (!e) {
          reset(selectedSize);
        }
      }}
    >
      <div className="flex items-center justify-start">
        <Button variant={"outline"} asChild>
          <PopoverTrigger className="rounded-3xl text-pink-500">
            {children}
          </PopoverTrigger>
        </Button>
      </div>

      <PopoverContent
        side={side}
        className="max-h-[600px] w-screen overflow-y-auto p-2 md:w-[600px] md:p-4"
      >
        <div>
          <ProductSecHeading main={`size: ${selectedSize}`} sub="selected" />
        </div>
        <div className="mt-5">
          <ProductSecHeading
            main="Colors And Stock"
            sub="select colors and stock"
          />
          <EditSubSelectionPopover />
          <EditImgUploadAndLists />
        </div>
        {error && <p className="my-2 text-end text-red-500">{error}</p>}
        <div className="flex items-center justify-end">
          <DashboardButton
            variant={"signature"}
            type="button"
            onClick={handleConfirm}
            pending={isPending}
            disabled={donotHaveAnything}
          >
            Update
          </DashboardButton>
        </div>
        <PopoverClose ref={popoverCloseRef}></PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default EditSelectionPopover;
