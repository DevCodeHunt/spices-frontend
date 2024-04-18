import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }).trim(),
  price: z.string().min(1, { message: "Product price is required" }).trim(),
  // category: z
  //   .string()
  //   .min(1, { message: "Product category is required" })
  //   .trim(),
  discountPrice: z.string().trim(),
  stock: z.string().min(1, { message: "Product stock is required" }).trim(),
});

export const addBannerFormSchema = z.object({
  title: z.string().min(1, { message: "Banner title is required" }).trim(),
  description: z.string().min(1, { message: "Banner description is required" }).trim(),
  link: z.string().trim(),
});

export const editBannerFormSchema = z.object({
  title: z.string().min(1, { message: "Banner title is required" }).trim(),
  description: z.string().min(1, { message: "Banner description is required" }).trim(),
  link: z.string().trim(),
})
