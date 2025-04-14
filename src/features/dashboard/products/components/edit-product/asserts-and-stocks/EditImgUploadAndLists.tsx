"use client";

import { cn } from "@/lib/utils";
import { Delete } from "lucide-react";
import { MdDeleteForever } from "react-icons/md";
import AddImageBox from "./EditAddImageBox";
import { useEditColorStockImageStore } from "../../../store/use-product-edit";

const EditImgUploadAndLists = () => {
  const { sizeColorStockImgArr, removeColorList, removeSizeList } =
    useEditColorStockImageStore();

  // filter for edit purpose
  const filteredInfo = sizeColorStockImgArr.filter(
    (item) => item.otherInfo.length !== 0,
  );
  return (
    <div>
      <ul className="my-3 overflow-hidden rounded-md border">
        <li className="grid grid-cols-[1fr_5fr_1fr] border-b bg-pink-500/15 p-3 font-medium">
          <div>Size</div>
          <div>Color And stock</div>

          <div>Actions</div>
        </li>

        {filteredInfo.length === 0 ? (
          <div className="p-4 text-center">No Lists Added yet !</div>
        ) : (
          filteredInfo.map((item) => (
            <div
              key={item.size}
              className="grid grid-cols-[1fr_5fr_1fr] rounded-md border-b p-3"
            >
              <div>{item.size}</div>

              <ul>
                {item.otherInfo.map((info) => (
                  <li
                    key={info.color}
                    className="relative flex flex-col gap-1 text-sm"
                  >
                    <span
                      className={cn(
                        "absolute -left-6 top-[2px] size-4 rounded-full",
                        info.tailwind,
                      )}
                    ></span>
                    <span className="absolute right-5 top-1">
                      <Delete
                        className="size-5 cursor-pointer text-red-500"
                        onClick={() => removeColorList(item.size, info.color)}
                      />
                    </span>
                    <span className="grid grid-cols-[0.4fr_0.2fr_5fr]">
                      <span>C</span>
                      <span>:</span>
                      <span>{info.color}</span>
                    </span>
                    <span className="grid grid-cols-[0.4fr_0.2fr_5fr]">
                      <span>S</span>
                      <span>:</span>
                      <span>{info.stock}</span>
                    </span>
                    <span className="grid grid-cols-[0.4fr_0.2fr_5fr]">
                      <span>U</span>
                      <span>:</span>
                      <span>
                        <AddImageBox
                          size={item.size}
                          color={info.color}
                          imgArr={info.imageArr}
                        />
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div>
                <MdDeleteForever
                  className="cursor-pointer text-2xl text-red-500"
                  onClick={() => removeSizeList(item.size)}
                />
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default EditImgUploadAndLists;
