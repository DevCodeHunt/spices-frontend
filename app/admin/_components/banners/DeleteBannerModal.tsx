"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDeleteBannerStore from "@/store/deleteBanner-store";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { TBanner } from "@/types";
import { useToast } from "@/components/ui/use-toast";


interface Props {
  banner: TBanner | null;
}

const DeleteBannerModal: React.FC<Props> = ({ banner}) => {
  const queryClient = useQueryClient();
  const deleteBannerStore = useDeleteBannerStore();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationKey: ["banners", banner?._id, { action: "delete" }],
    mutationFn: async () => {
      const response = await axiosInstance.delete(
        `/banners/${banner?._id}`,
      );

      return response.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({
        description: "Banner deleted successfully",
      });
      deleteBannerStore.onClose()
    },
    onError: (error: any) => {
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog
      open={deleteBannerStore.open}
      onOpenChange={deleteBannerStore.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and
            remove your data from our servers.
          </DialogDescription>
          <div className="flex items-center justify-between">
            <Button onClick={deleteBannerStore.onClose} variant="destructive">
              Cancel
            </Button>
            <Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>Delete</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBannerModal;
