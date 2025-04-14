"use client";
import { FileInput, FileUploader } from "@/components/ui/file-upload";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function EditExistedImageField({
  type,
}: {
  type: "add_new" | "exchange";
}) {
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    multiple: true,
  };
  const uploadNew = () => {
    console.log("upload new");
  };
  const exchange = () => {
    console.log("exchange");
  };

  return (
    <div className="sub-form-box drop-shadow">
      {files && files.length > 0 ? (
        <div className="relative">
          <Image
            height={250}
            width={250}
            src={URL.createObjectURL(files[0])}
            alt="product_img"
            className="h-[250px] w-[250px] overflow-hidden rounded-md object-cover object-center"
          />

          <div
            onClick={() => setFiles(null)}
            className="text-red-500f absolute right-1 top-0 cursor-pointer rounded-md bg-white/50 p-2"
          >
            <MdCancel className="text-lg text-red-500" />
          </div>
          {type === "add_new" ? (
            <DashboardButton
              onClick={uploadNew}
              className="mt-2 w-full py-4"
              variant={"signature"}
            >
              Upload
            </DashboardButton>
          ) : (
            <DashboardButton
              onClick={exchange}
              className="mt-2 w-full py-4"
              variant={"signature"}
            >
              Exchange
            </DashboardButton>
          )}
        </div>
      ) : (
        <FileUploader
          value={files}
          onValueChange={(info) => {
            if (info) {
              setFiles(info);
            }
          }}
          dropzoneOptions={dropZoneConfig}
          className="relative rounded-lg bg-background drop-shadow-md"
        >
          <FileInput
            id="fileInput"
            className="m-0 p-1 outline-dashed outline-1 outline-slate-500"
          >
            <div className="m-0 flex w-full flex-col items-center justify-center p-2">
              <CloudUpload className="size-7 text-pink-500" />
              <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
                &nbsp; or drag and drop
              </p>
            </div>
          </FileInput>
        </FileUploader>
      )}
    </div>
  );
}
