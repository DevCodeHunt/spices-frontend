"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useViewCategorytore } from "@/store/modalStore";
import { Category } from "@/types";
import Image from "next/image";

const ViewCategory = ({ category }: { category: Category}) => {
  const showCategory = useViewCategorytore();
  return (
    <Dialog open={showCategory.open} onOpenChange={showCategory.onClose}>
      <DialogContent>
        <div className="mt-6">
            <Image src={category?.image.url} alt={category?.image.id} width={400} height={400} className="rounded object-cover h-[250px] w-full" />
            <h2 className="text-xl font-bold mt-4">{category?.name}</h2>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewCategory;
