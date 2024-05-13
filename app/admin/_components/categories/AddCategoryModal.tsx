import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategoryFormSchema } from "@/schemas";
import useAddCategoryStore from "@/store/addCategoryStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { axiosPrivate } from "@/lib/axios";
import useCategoryMutation from "@/hooks/mutations/useCategoryMutation";
import { TImage } from "@/types";
import Image from "next/image";

const AddCategoryModal = () => {
  const addCategoryStore = useAddCategoryStore();
  const { addCategoryMutation } = useCategoryMutation();
  const [image, setImage] = useState<TImage | null>(null);
  const form = useForm<z.infer<typeof addCategoryFormSchema>>({
    resolver: zodResolver(addCategoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const onDrop = React.useCallback(
    async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const acceptedFilesTypes = ["svg", "png", "jpg", "jpeg"];
      const file = acceptedFiles[0];
      const fileExtension = file.name.split(".")[1];
      const filename = file.name.split(".")[0];
      if (!acceptedFilesTypes.includes(fileExtension.toLowerCase())) {
        toast.error(
          `${filename} is not a valid file extension. Please choose a file extension (svg, png, jpeg, jpg)`
        );
        return;
      }

      const loading = toast.loading("Uploading...");
      try {
        const formData = new FormData();
        formData.append("image", file);
        const response = await axiosPrivate.post(
          "/categories/upload-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImage(response.data);
        toast.success("Image uploaded successfully");
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      } finally {
        toast.dismiss(loading);
      }

      const rejectedFiles = fileRejections.map(
        (fileRejection) => fileRejection.file
      );
    },
    []
  );

  const onSubmit = async (values: z.infer<typeof addCategoryFormSchema>) => {
    const data = {
      name: values.name,
      image: image,
    };
    addCategoryMutation.mutate(data);
    addCategoryStore.onClose();
  };

  useEffect(() => {
    if (!addCategoryStore.open) {
      setImage(null);
      form.reset();
    }
  }, [addCategoryStore.open, form]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Dialog
      open={addCategoryStore.open}
      onOpenChange={addCategoryStore.onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 !mt-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-center w-full">
                <label
                  {...getRootProps()}
                  onClick={(e: any) => e.stopPropagation()}
                  htmlFor="image"
                  className={`flex flex-col items-center justify-center w-full h-48 ${!image ? "border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" :""}`}
                >
                  {image ? (
                    <Image src={image?.url} alt="category-image" width={400} height={400} className="w-full h-full rounded-lg object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or JPEG (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    {...getInputProps()}
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  //   disabled={mutation.isPending}
                  onClick={form.handleSubmit(onSubmit)}
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
