"use client";

import { useLoingUserInfo } from "@/features/auth/hooks/use-login-info";
import { getUserFromAuthSession } from "@/features/auth/server/auth.helper";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function UserInfo() {
  const { setNumber, setEmail } = useLoingUserInfo();

  const {} = useQuery({
    queryKey: ["login_user_info"],
    queryFn: async () => {
      const data = await getUserFromAuthSession();
      console.log(data, "info");

      if (data?.email) {
        setEmail(data.email);
      }
      if (data?.phoneNo) {
        setNumber(data.phoneNo);
      }
      return data;
    },
  });
  return <div className="hidden">only for getting the user info:</div>;
}

export default UserInfo;
