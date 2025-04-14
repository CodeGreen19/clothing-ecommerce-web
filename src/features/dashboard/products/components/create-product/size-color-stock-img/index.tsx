"use client";

import { AddProductFormProps } from "../../../types";
import SubSecWrapper from "../../shared/SubSecWrapper";
import SelectionPopover from "./SelectionPopover";
import ShowFinalTable from "./ShowFinalTable";

const SizeColorStockImg = ({ form }: AddProductFormProps) => {
  const data = form.watch("sizeColorStockAndImage");
  const error = form.formState.errors.sizeColorStockAndImage; // Get validation error

  return (
    <SubSecWrapper title="Asserts">
      <div>
        <SelectionPopover form={form} />
        {/* Show error message if validation fails */}
        {error && data.length === 0 && (
          <p className="text-sm text-red-500">{error.message as string}</p>
        )}

        <ul className="space-y-3">
          {data.length === 0 ? (
            <li className="py-4 text-center text-gray-500">
              No information added yet!
            </li>
          ) : (
            <ShowFinalTable form={form} asserts={data} />
          )}
        </ul>
      </div>
    </SubSecWrapper>
  );
};

export default SizeColorStockImg;
