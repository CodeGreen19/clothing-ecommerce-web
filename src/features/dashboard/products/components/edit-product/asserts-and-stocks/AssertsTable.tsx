"use client";
import { Button } from "@/components/ui/button";
import { ALL_PRODUCTS_SIZES } from "@/constants/dashboard";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { handleSuccess } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MdUpdate } from "react-icons/md";
import { updateProductNewAsserts } from "../../../server/product.action";
import { useSizeColorStockImgStore } from "../../../store/use-product-create";
import { useEditColorStockImageStore } from "../../../store/use-product-edit";
import {
  AddProductFormProps,
  DBSizeColorStockAndImagesType,
} from "../../../types";
import SelectionPopover from "../../create-product/size-color-stock-img/SelectionPopover";
import ShowFinalTable from "../../create-product/size-color-stock-img/ShowFinalTable";
import ExistedAssertsAndStocks from "./ExistedImagesAndStocks";

const AssertsTable = ({
  form,
  asserts,
  productId,
}: AddProductFormProps & {
  asserts: DBSizeColorStockAndImagesType[];
  productId: string | undefined;
}) => {
  const qc = useQueryClient();
  // initial selected states,
  const data = form.watch("sizeColorStockAndImage");
  const { reset: resetState } = useSizeColorStockImgStore();
  // for edit later
  const { selectedSize, setSelectedSize } = useEditColorStockImageStore();

  // database existed sizes
  const DBexistedSizes: AllPossibleSizesType[] = asserts.map(
    (item) => item.size,
  );

  // filtering data

  const formAsserts = data.filter((item) => {
    if (item.otherInfo.length) {
      if (Number(item.otherInfo[0].stock) !== 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  });

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: updateProductNewAsserts,
    onSuccess: async (info) => {
      if (info.message) {
        form.setValue("sizeColorStockAndImage", []);
        resetState();
      }
      await handleSuccess(info, qc, ["asserts"]);
    },
  });

  const handleSubmit = () => {
    const info = form.getValues();
    mutate({ productId, productInfo: info });
  };

  useEffect(() => {
    asserts.forEach((element) => {
      if (element.colorAndStocks.length) {
        setSelectedSize(element.size);
      }
    });
  }, [asserts, setSelectedSize]);
  // update initial colors
  // useEffect(() => {
  //   if (selectedSize) {
  //     if (asserts.length) {
  //       let colors = asserts
  //         .filter((item) => item.size === selectedSize)[0]
  //         .colorAndStocks.map((info) => info.color);
  //       setExistedColorsOnSize(colors);
  //       // select size,
  //       let id = asserts.filter((item) => item.size === selectedSize)[0].id;
  //       setSelectedSizeId(id);
  //     }
  //   }
  // }, [selectedSize]);

  return (
    <div className="flex w-full flex-col items-start gap-2 md:flex-row">
      <div className="grid w-full grow grid-cols-1 gap-4 rounded-md border bg-white p-4 md:w-[55%] md:grid-cols-[1fr_10fr]">
        <div className="flex gap-2 overflow-x-auto md:flex-col">
          {ALL_PRODUCTS_SIZES.map((item) => (
            <Button
              key={item}
              disabled={
                asserts.filter((info) => info.size === item).length
                  ? false
                  : true
              }
              onClick={() => {
                setSelectedSize(item);
              }}
              className={cn(
                "flex h-12 flex-none cursor-pointer items-center justify-center rounded-md border bg-gray-100 font-semibold text-black shadow-sm hover:bg-gray-200 md:w-full",
                selectedSize === item &&
                  "bg-pink-500 text-white hover:bg-pink-600",
              )}
            >
              {item}
            </Button>
          ))}
        </div>
        <div>
          <div className="w-full">
            <ExistedAssertsAndStocks
              selectedSize={selectedSize}
              info={asserts}
            />
          </div>
        </div>
      </div>
      {/* section for showing stated data  */}
      <div className="w-full rounded-md border bg-white p-4 md:w-[45%]">
        <h1 className="mb-2 text-sm">Add More Sizes</h1>
        <SelectionPopover
          DBexistedSizes={DBexistedSizes}
          side="right"
          form={form}
        />
        <ShowFinalTable asserts={formAsserts} form={form} />
        <div className="mt-4 flex items-center justify-end">
          <DashboardButton
            pending={isPending}
            disabled={!formAsserts.length || isPending}
            type="button"
            onClick={handleSubmit}
            className="w-20 bg-pink-500 text-white hover:bg-pink-600 hover:text-white md:w-32 [&_svg]:size-4"
            variant={"outline"}
          >
            <MdUpdate />
            Update <span className="hidden md:block"></span>
          </DashboardButton>
        </div>
      </div>
    </div>
  );
};

export default AssertsTable;
