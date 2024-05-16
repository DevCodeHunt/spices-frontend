"use client";

import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import UploadProductImage from "./upload-image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editProductFormSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import EditorJS from "@editorjs/editorjs";
import { tools } from "@/components/editor/editor-tool";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ProductState, setImages } from "@/redux/slices/productSlice";
import useProductMutation from "@/hooks/mutations/useProductMutation";
import useCategories from "@/hooks/queries/useCategories";
import { Category } from "@/types";
import useSingleProduct from "@/hooks/queries/useSingleProduct";

const EditProductForm = ({ productId }: { productId: string }) => {
  const dispatch = useAppDispatch();
  const { product } = useSingleProduct(productId);
  const { categories } = useCategories();
  const [editorContent, setEditorContent] = useState<any[]>([]);
  const { images } = useAppSelector(ProductState);
  const { updateProductMutation } = useProductMutation();
  const form = useForm<z.infer<typeof editProductFormSchema>>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      name: "",
      price: "",
      stock: "",
      discountPrice: "",
      category: product?.category,
      discountApplied: product?.discountApplied=== true ? "true" : "false",
      discountType: "",
      barCode: "",
      sku: "",
      discountDate: {
        from: undefined,
        to: undefined,
      },
      shippingPrice: "",
    },
  });

  useEffect(() => {
    if (product) {
      const discountStartDate = product.discountStartDate
        ? new Date(product.discountStartDate)
        : new Date();
      const discountEndDate = product.discountEndDate
        ? new Date(product.discountEndDate)
        : new Date();
        const discountApplied =  product?.discountApplied=== true ? "true" : "false"
      form.setValue("name", product.name || "");
      form.setValue("price", product.price.toString() || "");
      form.setValue("stock", product.stock.toString() || "");
      form.setValue("discountPrice", product.discountPrice.toString() || "");
      form.setValue("discountType", product.discountType || "");
      form.setValue("discountApplied", discountApplied || "");
      form.setValue("barCode", product.barCode.toString() || "");
      form.setValue("sku", product.sku.toString() || "");
      form.setValue("discountDate", {
        from: discountStartDate,
        to: discountEndDate,
      });
      form.setValue("category", product.category || "");
      form.setValue("shippingPrice", product.shippingPrice.toString() || "");
      dispatch(setImages(product.images || []));
      setEditorContent(product.description);
    }
  }, [product, form, dispatch]);

  const editorRef = useRef<EditorJS | null>(null);

  const onSubmit = async (values: z.infer<typeof editProductFormSchema>) => {
    const {
      name,
      price,
      stock,
      discountPrice,
      discountType,
      discountApplied,
      discountDate,
      category,
      barCode,
      shippingPrice,
      sku,
    } = values;
    const data = {
      name,
      stock: Number(stock),
      category,
      images,
      description: editorContent,
      price: Number(price),
      discountPrice: Number(discountPrice),
      discountType: Number(discountType),
      discountStartDate: discountDate?.from
        ? format(discountDate.from, "yyyy-MM-dd")
        : null,
      discountEndDate: discountDate?.to
        ? format(discountDate.to, "yyyy-MM-dd")
        : null,
      discountApplied: discountApplied === "true" ? true : false,
      barCode,
      shippingPrice: shippingPrice ? Number(shippingPrice) : 0,
      sku,
      id: product?._id
    };
    updateProductMutation.mutate(data);
  };


  useEffect(() => {
    const initializeEditor = async () => {
      const editor = new EditorJS({
        holder: "textEditor",
        placeholder: "Write your product description...",
        tools: tools,
        data: { blocks: product?.description },
        onReady: () => {
          editorRef.current = editor;
        },
        onChange: async () => {
          const editorContent = await editor.saver.save();
          setEditorContent(editorContent.blocks);
        },
      });
    };

    

    if(product) {
      initializeEditor();
    }

    return () => {
      if (
        editorRef.current &&
        typeof editorRef.current.destroy === "function"
      ) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [product]);

  return (
    <div className="mt-10">
      <div className="flex items-center justify-end">
        <Button
          disabled={updateProductMutation.isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          Edit Product
        </Button>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-1 gap-4 mt-6 w-full">
        <div className="bg-white shadow rounded p-4  w-full">
          <UploadProductImage />
        </div>

        <div className="col-span-2 shadow p-4 rounded bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            General Information
          </h3>

          <Form {...form}>
            <form className="space-y-4 mt-6">
              <div className="grid  2xl:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-x-4 gap-y-6">
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
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories &&
                            categories.map(
                              (category: Category, index: number) => (
                                <SelectItem key={index} value={category.name}>
                                  {category.name}
                                </SelectItem>
                              )
                            )}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        Discount Price (%){" "}
                        <span className="opacity-80 ml-1 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="14, 25, 30, etc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Discount Type{" "}
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
                <FormField
                  control={form.control}
                  name="discountDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Discount Date{" "}
                        <span className="opacity-80 ml-1 font-normal">
                          (optional)
                        </span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 border-gray-500 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value &&
                              field.value.from &&
                              field.value.to ? (
                                <>
                                  {format(field.value.from, "LLL dd, yyyy")} -{" "}
                                  {format(field.value.to, "LLL dd, yyyy")}
                                </>
                              ) : (
                                <span>Pick a date range</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 " />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={field.value}
                            onSelect={(dateRange) => field.onChange(dateRange)}
                            initialFocus
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discountApplied"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Discount Applied</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="true">True</SelectItem>
                          <SelectItem value="false">False</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="barCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bar Code</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping Price</FormLabel>
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

export default EditProductForm;
