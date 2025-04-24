"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { handleSuccess } from "@/lib/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useState } from "react";
import { DashboardButton } from "../../shared/DashboardButton";
import { deleteProduct } from "../server/product.action";

type DeleteProductDialogProps = {
  children: React.ReactNode;
  productId: string;
};

const DeleteProductModal: React.FC<DeleteProductDialogProps> = ({
  children,
  productId,
}) => {
  const qc = useQueryClient();
  const [confirmText, setConfirmText] = useState("");
  const [error, setError] = useState("");

  const handleDelete = () => {
    if (confirmText.toLowerCase() !== "delete") {
      setError("You must type 'delete' to confirm.");
      return;
    }
    setError("");

    mutate({ productId });
    // call the parent delete function
  };
  // mutations
  const { isPending, mutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: async (info) => {
      await handleSuccess(info, qc, ["table_products"]);
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-sm text-red-500">
            Deleting this product will also remove all its associated data,
            including stock records, images, color options, and size
            configurations. This action is irreversible.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 py-4">
          <label htmlFor="confirm" className="text-sm font-medium">
            Type <span className="font-bold text-red-600">delete</span> to
            confirm
          </label>
          <Input
            id="confirm"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              if (error) setError("");
            }}
            placeholder="delete"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <DialogFooter>
          <DashboardButton
            variant="signature"
            pending={isPending}
            onClick={handleDelete}
            disabled={confirmText.toLowerCase() !== "delete"}
          >
            Confirm Deletion
          </DashboardButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;
