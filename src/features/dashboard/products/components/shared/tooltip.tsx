import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export function ProductToolTip({
  children,
  text,
  isOpen,
}: {
  children: ReactNode;
  text: string;
  isOpen?: boolean;
}) {
  return isOpen === true ? (
    <TooltipProvider>
      <Tooltip disableHoverableContent>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side="bottom" className="z-50 delay-0 duration-0">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : null;
}
