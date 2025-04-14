"use client";

import { UseFormReset } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { MdLibraryAdd, MdOutlineAdd } from "react-icons/md";
import { DashboardButton } from "../../../shared/DashboardButton";
import { useSizeColorStockImgStore } from "../../store/use-product-create";
import { ProductSchemaType } from "../../types";

const AddProduct = ({
  pending,
  reset,
}: {
  pending: boolean;
  reset: UseFormReset<ProductSchemaType>;
}) => {
  const { reset: storeReset } = useSizeColorStockImgStore();
  return (
    <div className="mb-2 flex items-center justify-between px-3 md:px-0">
      <h1 className="flex items-center gap-1 text-lg font-bold text-pink-500">
        <MdLibraryAdd className="text-pink-500" />
        Add <span className="hidden md:block">New </span>Product
      </h1>
      <div className="space-x-2">
        <DashboardButton
          type="button"
          className="group w-auto md:w-32"
          onClick={() => {
            reset();
            storeReset();
          }}
          variant={"outline"}
        >
          <GrPowerReset className="transition-all group-active:rotate-180" />
          Reset <span className="hidden md:block">Form</span>
        </DashboardButton>
        <DashboardButton
          pending={pending}
          type="submit"
          className="w-20 bg-pink-500 text-white hover:bg-pink-600 hover:text-white md:w-32"
          variant={"outline"}
        >
          <MdOutlineAdd />
          Add <span className="hidden md:block">Product</span>
        </DashboardButton>
      </div>
    </div>
  );
};

export default AddProduct;
