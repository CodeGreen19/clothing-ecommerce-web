"use client";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { CloudUpload, Paperclip } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSizeColorStockImgStore } from "../../../store/use-product-create";

export default function AddImageBox({
  color,
  size,
  imgArr,
}: {
  size: AllPossibleSizesType;
  color: string;
  imgArr: File[];
}) {
  const { setImageFiles, sizeColorStockImgArr } = useSizeColorStockImgStore();
  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    multiple: true,
  };

  useEffect(() => {
    setFiles(imgArr);
  }, [sizeColorStockImgArr, setFiles, imgArr]);

  return (
    <div className="sub-form-box mb-10 drop-shadow">
      <FileUploader
        value={files}
        onValueChange={(info) => {
          if (info) {
            setFiles(info);
            setImageFiles(size, color, info);
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
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i}>
                <Popover>
                  <PopoverTrigger className="flex items-center justify-start gap-2">
                    <Paperclip className="h-4 w-4 stroke-current" />
                    <span className="truncate">Image {i + 1}</span>
                  </PopoverTrigger>
                  <PopoverContent
                    side="top"
                    align="center"
                    className="overflow-hidden rounded-md p-0"
                  >
                    <Image
                      height={300}
                      width={300}
                      src={URL.createObjectURL(file)}
                      alt="product_img"
                    />
                  </PopoverContent>
                </Popover>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
      </FileUploader>
    </div>
  );
}
