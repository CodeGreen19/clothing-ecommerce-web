"use client";

import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ACCOUNT_SIDEBAR_ARR } from "../../account/constants";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../../account/server/account.action";

const UserMenu = ({ children }: { children: ReactNode }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    mutationKey: ["user-logout"],
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ACCOUNT_SIDEBAR_ARR.map((item) => (
            <Link key={item.name} href={item.url}>
              <DropdownMenuItem>{item.name}</DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => mutate()}
            className="text-red-500"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
