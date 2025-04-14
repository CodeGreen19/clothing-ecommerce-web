import { cn } from "@/lib/utils";
import React from "react";

const ProductSecHeading = ({
  main,
  sub,
  className,
}: {
  main: string;
  sub?: string;
  className?: string;
}) => {
  return (
    <>
      <h1 className={cn("mb-2 font-bold", className)}>
        <span className="mr-1">{main}</span>
        {sub && (
          <span className="text-xs font-normal text-gray-500">({sub})</span>
        )}
      </h1>
    </>
  );
};

export default ProductSecHeading;
