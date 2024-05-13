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
import { Input } from "@/components/ui/input";
import { SendVerficationFormSchema } from "@/schemas";
import { Mail } from "lucide-react";
import Link from "next/link";
import FormError from "../layouts/FormError";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import { CustomError } from "@/types";

const SendVerficationForm = () => {
  const { sendVerificationMailMutation } = useAuthMutation();
  const form = useForm<z.infer<typeof SendVerficationFormSchema>>({
    resolver: zodResolver(SendVerficationFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof SendVerficationFormSchema>) => {
    const formData = new FormData();
    formData.append("email", values.email);
    sendVerificationMailMutation.mutate(formData);
  };


  return (
    <div className="max-w-lg w-full mx-auto mb-4">
      {sendVerificationMailMutation.isError && (
        <FormError
          message={
            (sendVerificationMailMutation.error as CustomError)?.response?.data
              .message || ""
          }
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 bg-white shadow p-4 rounded-md w-full"
        >

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

          <Button type="submit" size="lg" className="w-full !mt-6">
            Send
          </Button>

          <p className="text-center">
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SendVerficationForm;
