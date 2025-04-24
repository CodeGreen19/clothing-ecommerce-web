"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardInput from "@/features/dashboard/shared/DashboardInput";
import ProductSecHeading from "@/features/dashboard/products/components/shared/headings";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { allColorsGenious } from "@/features/dashboard/products/helpers/helper";
import { ALL_POSSIBLE_COLORS } from "../../../constants";
import { useEditColorStockImageStore } from "../../../store/use-product-edit";
const EditSubSelectionPopover = () => {
  //hooks
  const { selectedSize, setColorAndStock, existedColorsOnSize } =
    useEditColorStockImageStore();
  // states
  // temporary states for color and stock
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedTailwind, setSelectedTailwind] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [stockAndColorMessage, setStockAndColorMessage] = useState<string>("");

  // deleteing the message after 5s
  useEffect(() => {
    if (stockAndColorMessage) {
      setTimeout(() => {
        setStockAndColorMessage("");
      }, 5000);
    }
  }, [stockAndColorMessage]);
  // filtered info
  const filteredColors = useMemo(() => {
    return allColorsGenious(existedColorsOnSize, [...ALL_POSSIBLE_COLORS]);
  }, [existedColorsOnSize]);

  return (
    <Popover>
      <PopoverTrigger
        disabled={selectedSize ? false : true}
        className="my-2 flex w-full items-center justify-center gap-2 rounded-md border-2 bg-white p-4 transition-all hover:bg-stone-100 disabled:opacity-50 disabled:hover:bg-white"
      >
        Add stocks and color <Plus className="size-5" />
      </PopoverTrigger>
      <PopoverContent
        side="top"
        className="max-h-[400px] w-screen overflow-y-auto overflow-x-hidden p-2 md:w-[500px] md:p-4"
      >
        <div className="py-2 text-lg font-bold">Size : {selectedSize}</div>
        <div className="mb-2 flex items-center gap-3">
          <ProductSecHeading main="Colors" sub="Select any color" />
          {selectedColor && (
            <span className="-translate-y-1 text-sm"> ({selectedColor})</span>
          )}
        </div>
        <div className="grid grid-cols-10 gap-1 space-y-1">
          {filteredColors.map((colorInfo, i) => (
            <div
              onClick={() => {
                setSelectedColor(colorInfo.name);
                setSelectedTailwind(colorInfo.tailwind);
              }}
              className={cn(
                "group relative size-6 flex-none rounded-full p-2 ring-1 ring-black/60",
                colorInfo.tailwind,
                selectedColor === colorInfo.name &&
                  "ring-2 ring-blue-500 ring-offset-2",
              )}
              key={i}
            ></div>
          ))}
        </div>
        <ProductSecHeading
          main="Stock"
          sub="Give stock number based on color"
          className="mt-4"
        />
        <DashboardInput
          placeholder="Enter Stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <p className="mt-3 text-end text-xs text-red-500">
          {stockAndColorMessage}
        </p>
        <div className="mt-2 flex justify-end">
          <Button
            variant={"signature"}
            onClick={() => {
              if (selectedColor && Number(stock)) {
                // todo
                setColorAndStock(stock, selectedColor, selectedTailwind);
                setSelectedColor("");
                setStock("");
              } else {
                setStockAndColorMessage("Please add both stock and color !");
              }
            }}
          >
            Add It
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditSubSelectionPopover;
