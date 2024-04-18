"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editBannerFormSchema } from "@/schemas";
import { useToast } from "@/components/ui/use-toast";
import useEditBannerStore from "@/store/editBanner-store";
import { TBanner } from "@/types";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

interface Props {
  banner: TBanner | null;
  setBanner: React.Dispatch<React.SetStateAction<TBanner | null>>;
}

const EditBannerModal: React.FC<Props> = ({ banner, setBanner }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const editBannerStore = useEditBannerStore();
  const form = useForm<z.infer<typeof editBannerFormSchema>>({
    resolver: zodResolver(editBannerFormSchema),
    defaultValues: {
      title: banner?.title,
      description: banner?.description,
      link: banner?.link,
    },
  });
  const [image, setImage] = React.useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
  };

  const mutation = useMutation({
    mutationKey: ["banners", banner?._id, { action: "update" }],
    mutationFn: async (values: FormData) => {
      const response = await axiosInstance.put(
        `/banners/${banner?._id}`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({
        description: "Banner updated successfully",
      });
      editBannerStore.onClose();
    },
    onError: (error: any) => {
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof editBannerFormSchema>) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("link", values.link);
    formData.append("imageId", banner?.image.id || "");
    if (image instanceof File) {
      formData.append("image", image);
    } else if (banner?.image) {
      formData.append("image", JSON.stringify(banner.image));
    }

    mutation.mutate(formData);
  };

  return (
    <Dialog open={editBannerStore.open} onOpenChange={editBannerStore.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Banner</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </FormControl>
                {(banner?.image || image) && (
                  <Image
                    priority={true}
                    src={banner?.image.url || image && URL.createObjectURL(image) || ""}
                    alt="banner-image"
                    width={80}
                    height={80}
                    className="rounded object-cover"
                  />
                )}
                <FormMessage />
              </FormItem>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  disabled={mutation.isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                >
                  {mutation.isPending ? "Loading..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditBannerModal;
