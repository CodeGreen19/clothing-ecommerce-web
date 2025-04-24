// components/CartCard.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { deleteItemFromCart } from "../server/cart.action";
import { handleSuccess } from "@/lib/helper";

type CartItem = {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  color: string;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL";
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  item: CartItem;
};

export const CartCard = ({ item }: Props) => {
  const qc = useQueryClient();

  // mutations

  // delete
  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-cart-item"],
    mutationFn: deleteItemFromCart,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["cart_items"]);
    },
  });

  return (
    <Card className="flex w-full max-w-2xl flex-col items-start justify-start gap-4 rounded-2xl border p-4 shadow-sm">
      <div className="flex flex-col gap-1">
        <div className="text-lg font-semibold">{item.productName}</div>
        <div className="text-sm text-muted-foreground">
          Color: <span className="font-medium">{item.color}</span> · Size:{" "}
          <span className="font-medium">{item.size}</span>
        </div>
        <div className="text-base font-bold">Price : {item.price}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border px-2 py-1">
          <Button variant="ghost" size="icon" disabled={item.quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-2 font-medium">{item.quantity}</span>
          <Button variant="ghost" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="destructive"
          size="icon"
          disabled={isPending}
          onClick={() => mutate(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
