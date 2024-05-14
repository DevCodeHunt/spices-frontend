"use client";

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
import { ForgotPasswordFormSchema } from "@/schemas";
import { Mail } from "lucide-react";
import Link from "next/link";
import FormError from "../layouts/FormError";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import { CustomError } from "@/types";
import FormSuccess from "../layouts/FormSuccess";

const ForgotPasswordForm = () => {
  const { forgotPasswordMutation } = useAuthMutation();

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordFormSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    forgotPasswordMutation.mutate(formData);
  };

  return (
    <div className="max-w-lg w-full mx-auto mb-4">
      {forgotPasswordMutation.isError && forgotPasswordMutation.isError && (
        <FormError
          message={
            (forgotPasswordMutation.error as CustomError)?.response?.data
              .message || ""
          }
        />
      )}
      {forgotPasswordMutation.isSuccess && (
        <FormSuccess message={forgotPasswordMutation.data?.message} />
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white shadow p-4 rounded-md w-full"
        >
          <h1 className="text-3xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-sm">
            Forgot your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Mail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600" />
                    <Input
                      type="email"
                      placeholder="john@email.com"
                      {...field}
                      className="pl-10"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={forgotPasswordMutation.isPending}
            type="submit"
            size="lg"
            className="w-full !mt-6"
          >
            Reset Password
          </Button>

          <Link
            href="/signin"
            className="text-primary font-semibold hover:underline text-center block"
          >
            Sign In
          </Link>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;
