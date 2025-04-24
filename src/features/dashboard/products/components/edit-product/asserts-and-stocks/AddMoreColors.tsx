import { CardTitle } from "@/components/ui/card";
import DeleteEntireSize from "./DeleteEntireSize";
import EditSelectionPopover from "./EditSelectionPopover";

const AddMoreColors = ({
  productId,
  sizeId,
}: {
  productId: string;
  sizeId: string;
}) => {
  // const { existedColorsOnSize } = useEditColorStockImageStore();
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="mb-4 mt-3 flex items-center justify-start gap-2">
        <span>Existed Asserts</span>
        <EditSelectionPopover productId={productId} side="right">
          Add More
        </EditSelectionPopover>
      </CardTitle>
      <DeleteEntireSize productId={productId} sizeId={sizeId} />
    </div>
  );
};

export default AddMoreColors;
