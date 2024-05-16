"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useDeleteAllProducttore  } from "@/store/modalStore";
import useProductMutation from "@/hooks/mutations/useProductMutation";

interface Props {
  products: Product[];
}

const DeleteAllProduct: React.FC<Props> = ({ products }) => {
  const deleteAllProduct = useDeleteAllProducttore();
  const { deleteAllProductMutation } = useProductMutation();

  const handleDeleteProduct = () => {
    deleteAllProductMutation.mutate(products);
    deleteAllProduct.onClose();
  };

  return (
    <Dialog open={deleteAllProduct.open} onOpenChange={deleteAllProduct.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {products.length} product?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="!mt-2">
          This action cannot be undone. This will permanently delete and remove
          your product from our servers.
        </DialogDescription>
        <div className="flex items-center justify-between !mt-4">
          <Button onClick={deleteAllProduct.onClose} variant="destructive">
            Cancel
          </Button>
          <Button
            disabled={deleteAllProductMutation.isPending}
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllProduct;
