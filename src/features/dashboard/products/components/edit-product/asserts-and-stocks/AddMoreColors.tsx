import { CardTitle } from "@/components/ui/card";
import DeleteEntireSize from "./DeleteEntireSize";
import EditSelectionPopover from "./EditSelectionPopover";

const AddMoreColors = () => {
  // const { existedColorsOnSize } = useEditColorStockImageStore();
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="mb-4 mt-3 flex items-center justify-start gap-2">
        <span>Existed Asserts</span>
        <EditSelectionPopover side="right">Add More</EditSelectionPopover>
      </CardTitle>
      <DeleteEntireSize />
    </div>
  );
};

export default AddMoreColors;
