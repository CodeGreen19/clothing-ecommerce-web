"use client";

import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { DashboardButton } from "../shared/DashboardButton";

const CreateProductHeader = () => {
  return (
    <div className="mb-2 flex items-center justify-between px-3 md:px-0">
      <h1 className="flex items-center gap-1 text-lg font-bold text-pink-500">
        <AiFillProduct className="text-pink-500" />
        All <span className="hidden md:block">products </span>
      </h1>
      <div className="space-x-2">
        <DashboardButton
          type="button"
          className="group w-auto md:w-32"
          variant={"outline"}
          onClick={() => window.location.reload()}
        >
          <RefreshCcw className="transition-all group-active:rotate-180" />
          Refresh <span className="hidden md:block"></span>
        </DashboardButton>
        <Link href={"/dashboard/products/create-new"}>
          <DashboardButton
            type="submit"
            className="w-20 bg-pink-500 text-white hover:bg-pink-600 hover:text-white md:w-32"
            variant={"outline"}
          >
            <MdOutlineAdd />
            Create <span className="hidden md:block">One</span>
          </DashboardButton>
        </Link>
      </div>
    </div>
  );
};

export default CreateProductHeader;
