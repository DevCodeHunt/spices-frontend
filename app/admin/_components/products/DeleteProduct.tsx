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
import { useDeleteProducttore } from "@/store/modalStore";
import useProductMutation from "@/hooks/mutations/useProductMutation";

interface Props {
  product: Product;
}

const DeleteProduct: React.FC<Props> = ({ product }) => {
  const deleteProduct = useDeleteProducttore();
  const { deleteProductMutation } = useProductMutation();

  const handleDeleteProduct = () => {
    const values = {
      id: product._id,
      images: product.images,
    };
    deleteProductMutation.mutate(values);
    deleteProduct.onClose();
  };

  return (
    <Dialog open={deleteProduct.open} onOpenChange={deleteProduct.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this product?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="!mt-2">
          This action cannot be undone. This will permanently delete and remove
          your product from our servers.
        </DialogDescription>
        <div className="flex items-center justify-between !mt-4">
          <Button onClick={deleteProduct.onClose} variant="destructive">
            Cancel
          </Button>
          <Button
            disabled={deleteProductMutation.isPending}
            onClick={handleDeleteProduct}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProduct;
