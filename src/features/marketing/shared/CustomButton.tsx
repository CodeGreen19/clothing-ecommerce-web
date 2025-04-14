import { Button, ButtonProps } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonProps {
  pending?: boolean;
}

export function CustomButton({
  pending,
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <Button className={cn("w-32", className)} disabled={pending} {...props}>
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin duration-500" />
      ) : (
        children
      )}
    </Button>
  );
}
