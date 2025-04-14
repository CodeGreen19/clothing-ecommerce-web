import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { RiExchange2Fill } from "react-icons/ri";
import { DBSizeColorStockAndImagesType } from "../../../types";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import AddMoreColors from "./AddMoreColors";
import DeleteEntireCard from "./DeleteEntireCard";
import EditStock from "./EditStock";
import EditExistedImageField from "./EditExistedImageField";

const ExistedAssertsAndStocks = ({
  info,
  selectedSize,
}: {
  info: DBSizeColorStockAndImagesType[];
  selectedSize: AllPossibleSizesType;
}) => {
  const filteredInfo = info.filter((item) => item.size === selectedSize);
  console.log(filteredInfo);

  //
  if (filteredInfo.length === 0) {
    return <div className="text-red-500"></div>;
  }
  return (
    <div>
      <Card className="w-auto rounded-md border-none p-0 shadow-none">
        <AddMoreColors />
        <CardContent className="grid grid-cols-1 gap-2 p-0 lg:grid-cols-2">
          {filteredInfo[0].colorAndStocks.map((item) => (
            <div
              key={item.color}
              className="relative grow space-y-2 rounded-md border bg-white p-3 shadow"
            >
              <DeleteEntireCard />
              <h1>
                Color : {item.color}
                <span
                  className={cn(
                    "ml-1 inline-block size-3 rounded-full",
                    item.tailwind,
                  )}
                ></span>
              </h1>

              <EditStock colorId={item.id} initialStock={item.stock} />

              <div className="flex flex-wrap gap-2">
                {item.images.map((info) => (
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
                        <div className="absolute right-1 top-0 my-2 -translate-y-1 cursor-pointer rounded">
                          <Popover>
                            <PopoverTrigger className="rounded-md bg-white/50 p-2 text-pink-500">
                              <RiExchange2Fill />
                            </PopoverTrigger>
                            <PopoverContent side="right" className="p-0">
                              <EditExistedImageField type="exchange" />
                            </PopoverContent>
                          </Popover>
                        </div>
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
                      <EditExistedImageField type="add_new" />
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
