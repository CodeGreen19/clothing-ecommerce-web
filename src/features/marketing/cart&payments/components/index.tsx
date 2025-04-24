"use client";

import { ReactNode, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getUserCarts } from "../server/cart.action";
import { CartCard } from "./CartCard";

const CartsAndPaymentSheet = ({ children }: { children: ReactNode }) => {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { data, isPending } = useQuery({
    queryKey: ["cart_items"],
    queryFn: async () => await getUserCarts(),
  });

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        {isPending ? (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Loading...</SheetTitle>
            </SheetHeader>

            <SheetClose ref={closeRef}></SheetClose>
          </SheetContent>
        ) : data ? (
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Cart Items.</SheetTitle>
              <div>
                {data.map((item) => (
                  <CartCard key={item.id} item={item} />
                ))}
              </div>
            </SheetHeader>
            <div className="absolute bottom-0 right-0 flex w-full items-center justify-center bg-purple-200">
              <Link href={"/checkout"}>
                <Button onClick={() => closeRef.current?.click()}>
                  Proceed
                </Button>
              </Link>
            </div>
            <SheetClose ref={closeRef}></SheetClose>
          </SheetContent>
        ) : (
          <SheetContent>
            <SheetHeader>Cart is empty</SheetHeader>
            <SheetTitle>Go to shopping..</SheetTitle>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
};

export default CartsAndPaymentSheet;
