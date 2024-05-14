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
import { RegisterFormSchema } from "@/schemas";
import { KeyRound, Mail, TriangleAlert, UserRound } from "lucide-react";
import Link from "next/link";
import FormError from "../layouts/FormError";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import { CustomError } from "@/types";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const { signUptMutation, sendVerificationMailMutation } = useAuthMutation();
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      subscribed: false,
      acceptTerms: false,
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: z.infer<typeof RegisterFormSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("confirmPassword", values.confirmPassword);
    formData.append("subscribed", values.subscribed.toString());
    formData.append("acceptTerms", values.acceptTerms.toString());
    signUptMutation.mutate(formData);
  
  };

  const handleShowPassword = (val: boolean) => {
    setShowPassword(val);
  };

  const resendMail = () => {
    const email = form.getValues("email")
    const formData = new FormData();
    formData.append("email", email);
    sendVerificationMailMutation.mutate(formData);
  };

  return (
    <div className="max-w-lg w-full mx-auto mb-4">
      {signUptMutation.isError &&
      (signUptMutation.error as CustomError)?.response?.data.message ===
        "Email is already registered but not verified" ? (
        <div className="border-2 border-red-400 p-4 rounded-lg flex items-start gap-2 mb-4">
          <TriangleAlert className="text-red-400" size={32} />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-600">
              There was a problems
            </h3>
            <p className="text-sm text-gray-900 font-medium">
              Email is already registered but not verified
            </p>
          </div>
          <Button
            type="button"
            variant="destructive"
            disabled={sendVerificationMailMutation.isPending}
            onClick={resendMail}
          >
            Verify
          </Button>
        </div>
      ) : (
        signUptMutation.isError && (
          <FormError
            message={
              (signUptMutation.error as CustomError)?.response?.data.message ||
              ""
            }
          />
        )
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white shadow p-4 rounded-md w-full"
        >
          <h1 className="text-3xl font-bold text-gray-900">Sign Up</h1>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <UserRound className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600" />
                    <Input placeholder="John Doe" {...field} className="pl-9" />
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:underline"
                  >
                    Accept terms and conditions
                  </Link>
                </FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subscribed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Subscribe for the newsletter</FormLabel>
              </FormItem>
            )}
          />

          <Button
            disabled={signUptMutation.isPending}
            type="submit"
            size="lg"
            className="w-full !mt-6"
          >
            Sign Up
          </Button>

          <div className="flex items-center gap-4">
            <div className="w-full h-[1px] bg-gray-300 rounded"></div>
            <span>or</span>
            <div className="w-full h-[1px] bg-gray-300 rounded"></div>
          </div>

          <p className="text-center">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
