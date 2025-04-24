import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { deleteColorOfSpecifiedSize } from "../../../server/product.action";
import { handleSuccess } from "@/lib/helper";

const DeleteEntireCard = ({
  colorAndStockId,
  productId,
}: {
  colorAndStockId: string;
  productId: string;
}) => {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteColorOfSpecifiedSize,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["asserts"]);
    },
  });
  return (
    <div>
      <Popover>
        <PopoverTrigger className="absolute right-[2px] top-3 rounded p-2 text-lg text-red-500">
          <MdDeleteForever />
        </PopoverTrigger>
        <PopoverContent
          align="center"
          side="bottom"
          className="flex flex-col items-center justify-center gap-3"
        >
          <h1 className="text-center text-xs text-red-500">
            This action will delete all your uploaded image also !
          </h1>
          <h2 className="text-sm">Remove Color and Stock</h2>
          <DashboardButton
            pending={isPending}
            onClick={() => mutate({ colorAndStockId, productId })}
            className="w-24"
            variant={"signature"}
          >
            Delete
          </DashboardButton>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DeleteEntireCard;
