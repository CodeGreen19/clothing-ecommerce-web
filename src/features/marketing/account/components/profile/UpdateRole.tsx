"use client";

import { useMutation } from "@tanstack/react-query";
import React from "react";
import { updateRole } from "../../server/account.action";
import { Button } from "@/components/ui/button";

const UpdateRole = () => {
  const { mutate } = useMutation({
    mutationFn: updateRole,
  });
  return (
    <div>
      <Button onClick={() => mutate("b55b085d-43bb-4ae7-80fb-0ef315036a46")}>
        click to admin
      </Button>
    </div>
  );
};

export default UpdateRole;
