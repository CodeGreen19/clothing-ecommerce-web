import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className="text-[1.6rem] font-bold text-white md:text-[2rem]">
        ShopMaster
      </div>
    </Link>
  );
};

export default Logo;
