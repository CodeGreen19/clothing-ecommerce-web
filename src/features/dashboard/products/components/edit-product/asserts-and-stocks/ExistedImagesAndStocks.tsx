"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { handleSuccess } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { deleteExistedImage } from "../../../server/product.action";
import { DBSizeColorStockAndImagesType } from "../../../types";
import AddMoreColors from "./AddMoreColors";
import DeleteEntireCard from "./DeleteEntireCard";
import EditExistedImageField from "./EditExistedImageField";
import EditStock from "./EditStock";

const ExistedAssertsAndStocks = ({
  info,
  selectedSize,
  qc,
}: {
  info: DBSizeColorStockAndImagesType[];
  selectedSize: AllPossibleSizesType;
  qc: QueryClient;
}) => {
  const filteredInfo = info.filter((item) => item.size === selectedSize);
  // mutations
  const deleteMutate = useMutation({
    mutationFn: deleteExistedImage,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["asserts"]);
    },
  });
  //
  if (filteredInfo.length === 0) {
    return <div className="text-red-500"></div>;
  }

  return (
    <div>
      <Card className="w-auto rounded-md border-none p-0 shadow-none">
        <AddMoreColors
          productId={info[0].productId}
          sizeId={info.filter((item) => item.size === selectedSize)[0].id}
        />
        <CardContent className="grid grid-cols-1 gap-2 p-0 lg:grid-cols-2">
          {filteredInfo[0].colorAndStocks.map((item) => (
            <div
              key={item.color}
              className="relative grow space-y-2 rounded-md border bg-white p-3 shadow"
            >
              <DeleteEntireCard
                colorAndStockId={item.id}
                productId={info[0].productId}
              />
              <h1>
                Color : {item.color}
                <span
                  className={cn(
                    "ml-1 inline-block size-3 rounded-full",
                    item.tailwind,
                  )}
                ></span>
              </h1>

              <EditStock qc={qc} colorId={item.id} initialStock={item.stock} />

              <div className="flex flex-wrap gap-2">
                {item.images.map((info, i) => (
                  <div key={info.publicId} className="flex-none">
                    <Popover>
                      <PopoverTrigger>
                        <Image
                          height={80}
                          width={80}
                          src={info.secureUrl}
                          alt="product_img"
                          className="rounded-md"
                        />
                      </PopoverTrigger>
                      <PopoverContent
                        side="right"
                        className="relative w-auto border p-0"
                      >
                        {i === 0 ? (
                          <div className="absolute right-1 top-0 my-2 -translate-y-1 cursor-pointer rounded">
                            <Popover>
                              <PopoverTrigger className="rounded-md bg-white/50 p-2 text-pink-500">
                                <RiExchange2Fill />
                              </PopoverTrigger>
                              <PopoverContent side="right" className="p-0">
                                <EditExistedImageField
                                  colorAndStockId={info.colorAndStockId}
                                  publicId={info.publicId}
                                  imgId={info.id}
                                  type="exchange"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        ) : (
                          <DashboardButton
                            pending={deleteMutate.isPending}
                            onClick={() =>
                              deleteMutate.mutate({ imgId: info.id })
                            }
                            className="absolute right-1 top-1 w-8 rounded-md bg-white/50 p-2 !py-0 text-red-500"
                          >
                            <Trash2 className="size-4" />
                          </DashboardButton>
                        )}

                        <Image
                          height={220}
                          width={220}
                          src={info.secureUrl}
                          alt="product_img"
                          className="rounded-md"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
                <div>
                  <Popover>
                    <PopoverTrigger className="rounded-md bg-gray-50 p-2 text-pink-500">
                      <MdOutlineAddAPhoto />
                    </PopoverTrigger>
                    <PopoverContent side="right" className="p-0">
                      <EditExistedImageField
                        colorAndStockId={item.images[0].colorAndStockId}
                        type="add_new"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExistedAssertsAndStocks;
