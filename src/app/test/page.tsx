import { getUserIdFromAuthSession } from "@/features/auth/server/auth.helper";
import React from "react";

const Testpage = async () => {
  const data = await getUserIdFromAuthSession();
  console.log("info", data);

  return <div></div>;
};

export default Testpage;
