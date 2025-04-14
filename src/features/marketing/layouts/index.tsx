import { ChildrenProps } from "@/data/types";
import React from "react";
import Navbar from "./navbar";
import Footer from "./footer/index";

const MarketingLayout = ({ children }: ChildrenProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MarketingLayout;
