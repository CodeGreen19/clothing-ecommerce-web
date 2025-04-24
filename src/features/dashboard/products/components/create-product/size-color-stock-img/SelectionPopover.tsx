"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALL_PRODUCTS_SIZES } from "@/constants/dashboard";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { CompareSizesArray } from "@/features/dashboard/products/helpers/helper";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { useEffect, useRef, useState } from "react";
import { BiCustomize } from "react-icons/bi";
import { useSizeColorStockImgStore } from "../../../store/use-product-create";
import { AddProductFormProps } from "../../../types";
import ProductSecHeading from "../../shared/headings";
import UploadImageAndLists from "./ImgUploadAndLists";
import SubSelectionPopover from "./SubSelectionPopover";

const SelectionPopover = ({
  form,
  side = "bottom",
  DBexistedSizes,
}: AddProductFormProps & {
  side?: "bottom" | "right";
  DBexistedSizes?: AllPossibleSizesType[];
}) => {
  // hooks
  const { setSelectedSize, sizeColorStockImgArr, selectedSize } =
    useSizeColorStockImgStore();
  //states
  const [error, setError] = useState("");
  // refs
  const popoverCloseRef = useRef<HTMLButtonElement | null>(null);

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
    form.setValue("sizeColorStockAndImage", info);
    popoverCloseRef.current?.click();
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000); // remove error after 4 seconds
    }
  }, [error]);

  // cheking if all the sizes is selected
  if (DBexistedSizes) {
    if (
      CompareSizesArray({
        allSizes: [...ALL_PRODUCTS_SIZES],
        compareSizes: DBexistedSizes,
      })
    ) {
      return <div className="text-sm">Alas! Nothing to change.</div>;
    }
  }
  //
  const setInitialSize = () => {
    if (!DBexistedSizes || DBexistedSizes.length === 0) {
      //creating first time
      console.log("it is come here");

      setSelectedSize("XS");
    } else {
      // for updating
      let s_size: AllPossibleSizesType | null = null;
      ALL_PRODUCTS_SIZES.forEach((element) => {
        if (DBexistedSizes.includes(element)) {
        } else {
          if (!s_size) {
            s_size = element;
          }
        }
      });
      if (s_size) {
        setSelectedSize(s_size);
      }
    }
  };

  return (
    <Popover onOpenChange={() => handleConfirm()}>
      <div className="flex items-center justify-start">
        <Button variant={"outline"} asChild>
          <PopoverTrigger className="rounded-3xl" onClick={setInitialSize}>
            customize <BiCustomize className="text-xs text-pink-600" />{" "}
          </PopoverTrigger>
        </Button>
      </div>

      <PopoverContent
        side={side}
        className="max-h-[600px] w-screen overflow-y-auto p-2 md:w-[600px] md:p-4"
      >
        <div>
          <ProductSecHeading main="Sizes" sub="Select one" />
          <div className="flex flex-wrap gap-2">
            {ALL_PRODUCTS_SIZES.map((item) => (
              <div
                key={item}
                onClick={() => {
                  if (DBexistedSizes?.includes(item)) return;
                  setSelectedSize(item);
                }}
                className={cn(
                  "flex-none cursor-pointer rounded border border-stone-300 px-4 py-3 font-semibold",
                  selectedSize === item && "bg-pink-500 text-white",
                  DBexistedSizes?.includes(item) &&
                    "cursor-not-allowed opacity-30",
                )}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <ProductSecHeading
            main="Colors And Stock"
            sub="select colors and stock"
          />
          <SubSelectionPopover />
          <UploadImageAndLists />
        </div>
        {error && <p className="my-2 text-end text-red-500">{error}</p>}
        <div className="flex items-center justify-end">
          <Button variant={"signature"} type="button" onClick={handleConfirm}>
            Confirm
          </Button>
        </div>
        <PopoverClose ref={popoverCloseRef}></PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default SelectionPopover;
