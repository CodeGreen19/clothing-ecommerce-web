"use client";

import React, { ReactNode, useRef } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CartsAndPaymentSheet = ({ children }: { children: ReactNode }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
          <div className="absolute bottom-0 right-0 flex w-full items-center justify-center bg-purple-200">
            <Link href={"/checkout"}>
              <Button onClick={() => closeRef.current?.click()}>
                Checkout
              </Button>
            </Link>
          </div>
          <SheetClose ref={closeRef}></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CartsAndPaymentSheet;
