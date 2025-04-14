import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { handleSuccess } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, Edit } from "lucide-react";
import { useState } from "react";
import { MdUpdate } from "react-icons/md";
import { updateExistedStock } from "../../../server/product.action";

const EditStock = ({
  colorId,
  initialStock,
}: {
  initialStock: number;
  colorId: string;
}) => {
  const qc = useQueryClient();
  const { productId } = { productId: "dfasd" };
  const [shouldEdit, setShouldEdit] = useState<boolean>(false);
  const [newStock, setNewStock] = useState<string>("");

  // edit mutation
  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: updateExistedStock,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["asserts"]);
    },
  });
  return (
    <div className="grid grid-cols-[1fr_3fr] items-center">
      <h1>Stocks : </h1>
      <div>
        {shouldEdit ? (
          <div className="flex items-center justify-between">
            <Input
              value={newStock}
              placeholder="enter stock..."
              onChange={(e) => setNewStock(e.target.value)}
              type="number"
            />{" "}
            <div className="flex">
              <Button
                onClick={() => {
                  setNewStock("");
                  setShouldEdit(false);
                }}
                variant={"ghost"}
                className="text-red-500 hover:bg-transparent"
              >
                <DeleteIcon />
              </Button>
              <DashboardButton
                disabled={isPending}
                pending={isPending}
                className="w-10 !py-2"
                onClick={() => {
                  let stock: number = 0;
                  if (newStock) {
                    stock = Number(newStock);
                  }
                  mutate({
                    colorId,
                    previousStock: initialStock,
                    newStock: stock,
                    productId,
                  });
                }}
                variant={"signature"}
              >
                <MdUpdate />
              </DashboardButton>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>{initialStock}</span>

            <Edit
              onClick={() => {
                setNewStock(initialStock.toString());
                setShouldEdit(true);
              }}
              className="size-4 cursor-pointer text-pink-500"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EditStock;
