"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateBannerStore from "@/store/createBanner-store";
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

import { addBannerFormSchema } from "@/schemas";
import { useToast } from "@/components/ui/use-toast";
import { addBanner } from "@/actions";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateBannerModal = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createBannerStore = useCreateBannerStore();
  const form = useForm<z.infer<typeof addBannerFormSchema>>({
    resolver: zodResolver(addBannerFormSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
    },
  });
  const [image, setImage] = React.useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImage(event.target.files![0]);
  };

  const mutation = useMutation({
    mutationKey: ["banners"],
    mutationFn: async (values: FormData) => {
      const response = await axiosInstance.post("/banners", values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["banners"] });
      toast({
        description: "Banner created successfully",
      });
      // createBannerStore.onClose();
    },
    onError: (error: any) => {
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof addBannerFormSchema>) => {
    if (!image) {
      toast({
        description: "Image is required",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("link", values.link);

    mutation.mutate(formData);
  };

  React.useEffect(() => {
    if (!createBannerStore.open) {
      form.setValue("title", "");
      form.setValue("description", "");
      form.setValue("link", "");
      setImage(null);
    }
  }, [createBannerStore.open, form]);

  return (
    <Dialog
      open={createBannerStore.open}
      onOpenChange={createBannerStore.onClose}
    >
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

export default CreateBannerModal;
