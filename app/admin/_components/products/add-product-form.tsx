"use client";

import React, { useEffect, useRef, useState } from "react";
import UploadProductImage from "./upload-image";
import { TImage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addProductFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { tools } from "@/components/editor/editor-tool";
import { Button } from "@/components/ui/button";

const AddProductForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [uploadImages, setUploadImages] = useState<TImage[]>([]);
  const [editorContent, setEditorContent] = useState<any[]>([]);

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      discountPrice: "",
    },
  });

  const editorRef = useRef<EditorJS | null>(null);
  const onSubmit = async (values: z.infer<typeof addProductFormSchema>) => {
    console.log(editorContent);
  };

  useEffect(() => {
    const initializeEditor = async () => {
      const editor = new EditorJS({
        holder: "textEditor",
        placeholder: "Write your product description...",
        tools: tools,
        onReady: () => {
          editorRef.current = editor;
        },
        onChange: async () => {
          const editorContent = await editor.saver.save();
          setEditorContent(editorContent.blocks);
        },
      });
    };

    initializeEditor();

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-end">
        <Button onClick={form.handleSubmit(onSubmit)}>Add Product</Button>
      </div>
      <div className="flex lg:flex-row flex-col gap-4 mt-6">
        <div className="bg-white shadow rounded p-4 lg:w-[450px] w-full">
          <UploadProductImage
            images={images}
            setImages={setImages}
            setUploadImages={setUploadImages}
          />
        </div>

        <div className="flex-1 shadow p-4 rounded bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            General Information
          </h3>

          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Price</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="discountPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Price{" "}
                        <span className="opacity-80 ml-1 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="bg-white shadow p-4 rounded my-10">
        <h3 className="text-lg font-semibold text-gray-800">
          Product Description
        </h3>
        <div id="textEditor" className="mt-4"></div>
      </div>
    </div>
  );
};

export default AddProductForm;
