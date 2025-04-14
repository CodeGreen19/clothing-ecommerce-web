"use client";

import { UploadCloud } from "lucide-react";
import { UseFormReset } from "react-hook-form";
import { GrPowerReset } from "react-icons/gr";
import { MdUpdate } from "react-icons/md";
import { DashboardButton } from "../../../shared/DashboardButton";
import { ProductSchemaType } from "../../types";

const UpdateProductHeader = ({
  pending,
}: {
  pending: boolean;
  reset: UseFormReset<ProductSchemaType>;
}) => {
  return (
    <div className="mb-2 flex items-center justify-between px-3 md:px-0">
      <h1 className="flex items-center gap-1 text-lg font-bold text-pink-500">
        <UploadCloud className="text-pink-500" />
        Update Product
      </h1>
      <div className="space-x-2">
        <DashboardButton
          type="button"
          className="group w-auto md:w-32"
          onClick={() => {
            window.location.reload();
          }}
          variant={"outline"}
        >
          <GrPowerReset className="transition-all group-active:rotate-180" />
          Refresh <span className="hidden md:block"></span>
        </DashboardButton>
        <DashboardButton
          pending={pending}
          type="submit"
          className="w-20 bg-pink-500 text-white hover:bg-pink-600 hover:text-white md:w-32 [&_svg]:size-4"
          variant={"outline"}
        >
          <MdUpdate />
          Update <span className="hidden md:block"></span>
        </DashboardButton>
      </div>
    </div>
  );
};

export default UpdateProductHeader;
