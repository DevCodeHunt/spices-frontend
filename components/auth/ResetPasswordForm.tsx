"use client";

import React, { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ResetPasswordFormSchema } from "@/schemas";
import { KeyRound } from "lucide-react";
import FormError from "../layouts/FormError";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import { CustomError } from "@/types";
import { useRouter } from "next/navigation";
import FormSuccess from "../layouts/FormSuccess";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const { resetPasswordMutation } = useAuthMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  console.log(form.formState.errors);
  
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: z.infer<typeof ResetPasswordFormSchema>) => {
    const formData = new FormData();
    formData.append("newPassword", values.newPassword);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("token", token);
    resetPasswordMutation.mutate(formData);
  };

  const handleShowPassword = (val: boolean) => {
    setShowPassword(val);
  };

  return (
    <div className="max-w-lg w-full mx-auto mb-4">
      {resetPasswordMutation.isError && (
        <FormError
          message={
            (resetPasswordMutation.error as CustomError)?.response?.data
              .message || ""
          }
        />
      )}
      {resetPasswordMutation.isSuccess && (
        <FormSuccess message={resetPasswordMutation.data?.message} />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white shadow p-4 rounded-md w-full"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Reset Your Password
          </h1>

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <KeyRound className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="****************"
                      {...field}
                      className="pl-9"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <KeyRound className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="****************"
                      {...field}
                      className="pl-9"
                    />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="showPassword"
              checked={showPassword}
              onCheckedChange={(checked) =>
                handleShowPassword(checked as boolean)
              }
            />
            <label
              htmlFor="showPassword"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Password
            </label>
          </div>

          <Button
            disabled={resetPasswordMutation.isPending}
            type="submit"
            size="lg"
            className="w-full !mt-6"
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
