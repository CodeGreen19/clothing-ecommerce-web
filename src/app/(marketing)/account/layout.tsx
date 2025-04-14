import AccountLayout from "@/features/marketing/account/components";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <AccountLayout>{children}</AccountLayout>;
};

export default layout;
