import { z } from "zod";

export const addProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }).trim(),
  price: z.string().min(1, { message: "Product price is required" }).trim(),
  // category: z
  //   .string()
  //   .min(1, { message: "Product category is required" })
  //   .trim(),
  discountPrice: z.string().trim(),
  stock: z.string().min(1, { message: "Product stock is required"}).trim(),
});
