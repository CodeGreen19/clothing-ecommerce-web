import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";

const DashboardInput = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <Input
      className={cn(
        "rounded-md border-none bg-stone-200/50 py-5 text-sm ring-offset-1 transition-all placeholder:text-sm placeholder:text-stone-400 focus-visible:ring-pink-600 md:py-6",
        className,
      )}
      {...props}
    />
  );
};

export default DashboardInput;
