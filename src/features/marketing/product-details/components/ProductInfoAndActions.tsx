import React, { useEffect, useState } from "react";
import { FullProduct } from "../types";
import { ALL_PRODUCTS_SIZES } from "@/constants/dashboard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AllPossibleSizesType } from "@/constants/dashboard/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCartItem } from "../../cart&payments/server/cart.action";
import { handleSuccess } from "@/lib/helper";

const ProductInfoAndActions = ({ info }: { info: FullProduct }) => {
  const qc = useQueryClient();
  const [selectedSize, setSelectedSize] = useState<AllPossibleSizesType | null>(
    null,
  );
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const { id, givenPrice, finalPrice, name, sizeColorStockAndImage } = info;

  const selectedSizeData = sizeColorStockAndImage.find(
    (item) => item.size === selectedSize,
  );

  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: createCartItem,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["cart_items"]);
    },
  });

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    const cartInfo = {
      productId: id,
      productName: info.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };

    mutate(cartInfo);
  };

  useEffect(() => {
    if (!selectedSize && sizeColorStockAndImage.length > 0) {
      setSelectedSize(sizeColorStockAndImage[0].size);
    }
  }, [sizeColorStockAndImage, selectedSize]);

  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="mb-2 text-2xl font-bold text-gray-800">{name}</h2>

      <div className="mb-2 flex items-center space-x-3">
        <span className="text-xl font-semibold text-green-600">
          ${finalPrice}
        </span>
        {givenPrice > finalPrice && (
          <span className="text-sm text-gray-500 line-through">
            ${givenPrice}
          </span>
        )}
      </div>

      {/* Size selection */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {ALL_PRODUCTS_SIZES.map((sizeLabel) => {
          const sizeData = sizeColorStockAndImage.find(
            (s) => s.size === sizeLabel,
          );
          return (
            <Button
              key={sizeLabel}
              onClick={() => sizeData && setSelectedSize(sizeData.size)}
              variant="outline"
              disabled={!sizeData}
              className={cn(
                "flex-none rounded-md border px-4 py-2",
                sizeData?.size === selectedSize &&
                  "border-pink-500 bg-pink-500 text-white",
              )}
            >
              {sizeLabel}
            </Button>
          );
        })}
      </div>

      {/* Color selection */}
      {selectedSizeData && (
        <div className="mb-10 flex flex-wrap items-center gap-2">
          {selectedSizeData.colorAndStocks.map((colorStock) => (
            <div
              key={colorStock.id}
              onClick={() => setSelectedColor(colorStock.color)}
              className={cn(
                "size-8 flex-none cursor-pointer rounded-full border",
                colorStock.tailwind,
                selectedColor === colorStock.color &&
                  "ring-2 ring-pink-500 ring-offset-2",
              )}
            ></div>
          ))}
        </div>
      )}
      {/* quantity section  */}
      <div className="my-4">
        <Button
          onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          variant={"outline"}
        >
          -
        </Button>
        <Button variant={"outline"}>{quantity}</Button>
        <Button onClick={() => setQuantity(quantity + 1)} variant={"outline"}>
          +
        </Button>
      </div>

      {/* Add to cart */}
      <Button
        onClick={handleAddToCart}
        disabled={!selectedSize || !selectedColor || isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductInfoAndActions;
