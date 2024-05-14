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
import { Category, TBanner } from "@/types";
import { useDeleteCategorytore } from "@/store/modalStore";
import useCategoryMutation from "@/hooks/mutations/useCategoryMutation";

interface Props {
  category: Category;
}

const DeleteCategory: React.FC<Props> = ({ category }) => {
  const deleteCategory = useDeleteCategorytore();
  const { deleteCategoryMutation } = useCategoryMutation();

  const handleDeleteCategory =  () => {
    deleteCategoryMutation.mutate(category)
    deleteCategory.onClose()
  }
  return (
    <Dialog open={deleteCategory.open} onOpenChange={deleteCategory.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {category?.name}?
          </DialogTitle>
          <DialogDescription className="!mt-2">
            This action cannot be undone. This will permanently delete and
            remove your category {category?.name} from our servers.
          </DialogDescription>
          <div className="flex items-center justify-between !mt-4">
            <Button onClick={deleteCategory.onClose} variant="destructive">
              Cancel
            </Button>
            <Button
              disabled={deleteCategoryMutation.isPending}
              onClick={handleDeleteCategory}
            >
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategory;
