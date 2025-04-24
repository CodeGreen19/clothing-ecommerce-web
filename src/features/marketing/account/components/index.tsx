"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { ACCOUNT_SIDEBAR_ARR } from "../constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <div className="h-32 w-full bg-purple-100">banner</div>
      <div className="container m-auto flex">
        <div className="w-[250px] flex-none">
          <h1>Sidebar info</h1>
          <ul>
            {ACCOUNT_SIDEBAR_ARR.map((item) => (
              <Link key={item.name} href={item.url}>
                <li
                  className={cn(
                    "border p-3",
                    pathname === item.url && "bg-pink-50 text-pink-800",
                  )}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-full bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
