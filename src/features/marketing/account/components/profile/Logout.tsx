"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { userLogout } from "../../server/account.action";

const Logout = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: userLogout,
    mutationKey: ["user-logout"],
  });
  return (
    <div>
      <Button disabled={isPending} onClick={() => mutate()}>
        Logout
      </Button>
    </div>
  );
};

export default Logout;
