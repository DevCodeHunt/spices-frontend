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
import { Category } from "@/types";
import { useDeleteAllCategorytore } from "@/store/modalStore";
import useCategoryMutation from "@/hooks/mutations/useCategoryMutation";

interface Props {
  categories: Category[];
}

const DeleteAllCategory: React.FC<Props> = ({ categories }) => {
  const deleteALlCategory = useDeleteAllCategorytore();
  const { deleteAllCategoryMutation } = useCategoryMutation();

  const handleDeleteCategory = () => {
    deleteAllCategoryMutation.mutate(categories);
    deleteALlCategory.onClose();
  };
  return (
    <Dialog
      open={deleteALlCategory.open}
      onOpenChange={deleteALlCategory.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete {categories.length} categories?
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="!mt-2">
          This action cannot be undone. This will permanently delete and remove
          your category selected {categories.length} from our servers.
        </DialogDescription>
        <div className="flex items-center justify-between !mt-4">
          <Button onClick={deleteALlCategory.onClose} variant="destructive">
            Cancel
          </Button>
          <Button
            disabled={deleteAllCategoryMutation.isPending}
            onClick={handleDeleteCategory}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAllCategory;
