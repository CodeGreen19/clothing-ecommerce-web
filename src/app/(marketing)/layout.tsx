import { ChildrenProps } from "@/data/types";
import MarketingLayout from "@/features/marketing/layouts";
import React from "react";

const layout = ({ children }: ChildrenProps) => {
  return <MarketingLayout>{children}</MarketingLayout>;
};

export default layout;
