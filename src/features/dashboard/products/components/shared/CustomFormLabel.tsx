import { FormLabel } from "@/components/ui/form";
import React from "react";

const CustomFormLabel = ({ title, des }: { title: string; des: string }) => {
  return (
    <div>
      <FormLabel>{title}</FormLabel>
      <h3 className="text-xs text-stone-400">{des}</h3>
    </div>
  );
};

export default CustomFormLabel;
