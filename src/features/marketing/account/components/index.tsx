import Link from "next/link";
import React, { ReactNode } from "react";

const AccountLayout = ({ children }: { children: ReactNode }) => {
  const arr = [
    { name: "Dashboard", url: "/account/dashboard" },
    { name: "Profile", url: "/account/profile" },
    { name: "Orders", url: "/account/orders" },
    { name: "WishLists", url: "/account/wishlists" },
  ];
  return (
    <div className="min-h-screen">
      <div className="h-32 w-full bg-purple-100">banner</div>
      <div className="container m-auto flex">
        <div className="w-[250px] flex-none">
          <h1>Sidebar info</h1>
          <ul>
            {arr.map((item) => (
              <Link key={item.name} href={item.url}>
                <li className="border p-3">{item.name}</li>
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
