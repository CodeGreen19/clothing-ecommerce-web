"use client";

import { UploadCloud } from "lucide-react";

import { MdCancel } from "react-icons/md";

import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { AddProductFormProps } from "../../../types";

const UpdateAssertsHeader = ({
  form,
  closeModal,
}: { pending: boolean; closeModal: () => void } & AddProductFormProps) => {
  const info = form.watch("sizeColorStockAndImage");
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center justify-start gap-2">
        <h1 className="flex items-center gap-1 text-lg font-bold text-pink-500">
          <UploadCloud className="text-pink-500" />
          Asserts
        </h1>
      </div>
      <div className="space-x-2">
        <AlertDialogCancel
          type="button"
          className="group w-auto py-6 md:w-32"
          onClick={() => {
            if (!info.length) {
              form.setValue("sizeColorStockAndImage", []);
            }
            closeModal();
          }}
        >
          <MdCancel className="transition-all group-active:scale-150 group-active:text-red-500" />
          Cancel <span className="hidden md:block"></span>
        </AlertDialogCancel>
      </div>
    </div>
  );
};

export default UpdateAssertsHeader;
