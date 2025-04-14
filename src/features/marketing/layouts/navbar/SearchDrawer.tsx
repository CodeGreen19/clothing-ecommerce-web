import React, { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const SearchDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent side={"top"} className="m-auto max-w-xl rounded-b-md">
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription>
              <Input className="py-6" placeholder="Search anything ..." />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SearchDrawer;
