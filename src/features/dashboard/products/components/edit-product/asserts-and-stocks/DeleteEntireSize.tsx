import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DashboardButton } from "@/features/dashboard/shared/DashboardButton";
import { handleSuccess } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdDeleteForever } from "react-icons/md";
import { deleteSpecifiedSize } from "../../../server/product.action";

const DeleteEntireSize = ({
  productId,
  sizeId,
}: {
  productId: string;
  sizeId: string;
}) => {
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSpecifiedSize,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["asserts"]);
    },
  });
  return (
    <div>
      <Popover>
        <PopoverTrigger className="text-xl text-red-500">
          <MdDeleteForever />
        </PopoverTrigger>
        <PopoverContent
          align="center"
          side="bottom"
          className="flex flex-col items-center justify-center gap-3"
        >
          <h1 className="text-center text-xs text-red-500">
            This action will delete all your sizes and uploaded image also !
          </h1>
          <DashboardButton
            pending={isPending}
            onClick={() => mutate({ productId, sizeId })}
            className="w-24"
            variant={"signature"}
          >
            Delete Size
          </DashboardButton>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DeleteEntireSize;
