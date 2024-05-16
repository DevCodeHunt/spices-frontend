import { z } from "zod";

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const RegisterFormSchema = z
  .object({
    name: z.string().min(1, { message: "Full name is required" }).trim(),
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(passwordRegex, {
        message:
          "Password must be at least eight characters, at least one letter, one number and one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Conform password is required" })
      .trim(),
    acceptTerms: z.boolean(),
    subscribed: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });

export const LoginFormSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" }),
    signedIn: z.boolean(),
  });

export const SendVerficationFormSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
  })

export const ForgotPasswordFormSchema = z
  .object({
    email: z.string().min(1, { message: "Email is required" }).email().trim(),
  })

export const ResetPasswordFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, { message: "New password is required" })
      .regex(passwordRegex, {
        message:
          "Password must be at least eight characters, at least one letter, one number and one special character",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Conform password is required" })
      .trim(),

  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords does not match",
  });


export const addProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }).trim(),
  price: z.string().min(1, { message: "Product price is required" }).trim(),
  category: z
    .string()
    .min(1, { message: "Product category is required" })
    .trim(),
  discountPrice: z.string().trim(),
  discountType: z.string().optional(),
  discountDate: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .optional(),
  discountApplied: z.string().optional(),
  shippingPrice: z.string().trim(),
  barCode: z.string().trim(),
  sku: z.string().trim(),
  stock: z.string().min(1, { message: "Product stock is required" }).trim(),
});

export const editProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product name is required" }).trim(),
  price: z.string().min(1, { message: "Product price is required" }).trim(),
  category: z
    .string()
    .min(1, { message: "Product category is required" })
    .trim(),
  discountPrice: z.string().trim(),
  discountType: z.string().optional(),
  discountDate: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .optional(),
  discountApplied: z.string().optional(),
  shippingPrice: z.string().trim(),
  barCode: z.string().trim(),
  sku: z.string().trim(),
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

export const addCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }).trim(),
});


export const reviewFormSchema = z.object({
  message: z.string().min(1, { message: "Message is required" }).trim(),
  rating: z.number(),
});



