import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { handleSuccess } from "@/lib/helper";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { DeleteIcon, Edit } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MdUpdate } from "react-icons/md";
import { updateExistedStock } from "../../../server/product.action";

const EditStock = ({
  colorId,
  initialStock,
  qc,
}: {
  initialStock: number;
  colorId: string;
  qc: QueryClient;
}) => {
  const pathName = usePathname();
  const mainPath = pathName.split("/")[pathName.split("/").length - 1];
  const [productSlug] = mainPath.split("?");
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
                    productSlug,
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
