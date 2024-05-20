"use client";

import { Input } from "@/components/ui/input";
import { AtSign, Check, Phone } from "lucide-react";
import React, { useState } from "react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { calculateCartTotals } from "@/lib/helper";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { CartItem } from "@/types";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { paymentFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { OrderState } from "@/redux/slices/orderSlice";
import { useSnackbar } from "notistack";
import { axiosPrivate } from "@/lib/axios";
import useOrderMutation from "@/hooks/mutations/useOrderMutation";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const charRegex = /^[a-zA-Z]+$/;
const zipRegex = /^[0-9]{4,6}$/;
const stringRegex = /^[a-zA-Z0-9\s,'-]*$/;

const CheckoutForm = () => {
  const { makeOrderMutation } = useOrderMutation();
  const { paymentMethod } = useAppSelector(OrderState);
  const { user } = useAppSelector(UserState);
  const carts = user?.carts as CartItem[];
  const [isLoading, setIsLoading] = useState(false);
  const { subTotal, totalDiscount, total } = calculateCartTotals(carts);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      phone: "",
    },
  });

  const makeStripePayment = async () => {
    const stripePromise = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );
    setIsLoading(true);
    try {
      const response = await axiosPrivate.post("/payments/checkout", {
        paymentMethod,
        products: carts,
      });
      const session = response.data();
      const result = await stripePromise?.redirectToCheckout({
        sessionId: session.id,
      });
      return result;
    } catch (error: any) {
      enqueueSnackbar(
        error?.response?.data.message || "Something went wrig during",
        { variant: "error" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof paymentFormSchema>) => {
    if (paymentMethod === "") {
      enqueueSnackbar("Please select a payment method", {
        variant: "error",
      });
      return;
    }
    const responseData = {
      products: carts,
      data: {
        paymentMethod,
        email: values.email,
        subTotal,
        totalDiscount,
        total,
      },
      shippingAddress: {
        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        zip: values.zip,
      },
    };
    if (paymentMethod === "Card") {
      const payment = await makeStripePayment();
      makeOrderMutation.mutate(responseData);
      return;
    }

    if (paymentMethod === "CashOnDelivery") {
      makeOrderMutation.mutate(responseData);
      return;
    }
  };

  const email = watch("email");
  const address = watch("address");
  const city = watch("city");
  const state = watch("state");
  const country = watch("country");
  const zip = watch("zip");

  const validMail = emailRegex.test(email);
  const validcity = charRegex.test(city);
  const validstate = charRegex.test(state);
  const validcountry = charRegex.test(country);
  const validzip = zipRegex.test(zip);
  const validAddress = stringRegex.test(address);

  const validFullAddress =
    validcity && validstate && validcountry && validAddress && validzip;

  const fullAddressError =
    errors.address?.message ||
    errors.country?.message ||
    errors.zip?.message ||
    errors.state?.message ||
    errors.city?.message;
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Payment Details</h2>
        <p className="text-gray-700 mb-6">
          complete your purchase item by providing your payment details order.
        </p>

        <div className="space-y-6">
          <div>
            <span className="font-bold">
              Email Address{" "}
              {errors.email?.message && (
                <span className="font-medium text-red-600">
                  (
                  {errors.email?.message === "Invalid email"
                    ? errors.email?.message
                    : "Required"}
                  )
                </span>
              )}
            </span>
            <div className="relative h-14 rounded-lg flex items-center border border-gray-300 mt-2">
              <AtSign className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
              <Input
                {...register("email")}
                placeholder="john.doe@email.com"
                className="w-[calc(100%_-_84px)] mx-auto border-none"
              />
              {validMail && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 rounded-full flex items-center justify-center bg-green-300">
                  <Check size={18} className="text-green-600" />
                </div>
              )}
            </div>
          </div>

          <div>
            <span className="font-bold">
              Phone Number
              {errors.email?.message && (
                <span className="font-medium text-red-600 ml-1">
                  ({errors.phone?.message})
                </span>
              )}
            </span>
            <div className="relative h-14 rounded-lg flex items-center border border-gray-300 mt-2">
              <Phone className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-500" />
              <Input
                {...register("phone")}
                placeholder="+9167545678"
                className="w-[calc(100%_-_84px)] mx-auto border-none"
              />
              {validMail && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 rounded-full flex items-center justify-center bg-green-300">
                  <Check size={18} className="text-green-600" />
                </div>
              )}
            </div>
          </div>

          <div>
            <span className="font-bold">
              Address{" "}
              {fullAddressError && (
                <span className="font-medium text-red-600">(Required)</span>
              )}
            </span>
            <div className="relative h-14 rounded-t-lg flex items-center border border-gray-300 mt-2">
              <Input
                {...register("address")}
                placeholder="Your Address"
                className="w-full border-none h-full"
              />
              {validFullAddress && (
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-6 h-6 rounded-full flex items-center justify-center bg-green-300">
                  <Check size={18} className="text-green-600" />
                </div>
              )}
            </div>
            <div className="h-14 grid grid-cols-3 border border-gray-300 border-t-0">
              <Input
                {...register("state")}
                placeholder="State"
                className="w-full border-l-0 border-t-0 border-b-0 h-full border-r border-gray-300 rounded-r-none"
              />
              <Input
                placeholder="City"
                {...register("city")}
                className="w-full border-l-0 border-t-0 border-b-0 h-full border-r border-gray-300 rounded-none"
              />
              <Input
                {...register("zip")}
                placeholder="Zip"
                className="w-full border-none h-full"
              />
            </div>
            <Input
              {...register("country")}
              placeholder="Country"
              className="w-full border border-gray-300 h-14 border-t-0 rounded-t-none "
            />
          </div>
        </div>

        <Separator className="my-4 bg-gray-300" />

        <div className="space-y-3 my-4">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span>{subTotal}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span>{totalDiscount}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{total}</span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Payment Method</span>
            <span>{paymentMethod ? paymentMethod : "-"}</span>
          </div>
        </div>

        <Button
          disabled={isLoading || makeOrderMutation.isPending}
          onClick={handleSubmit(onSubmit)}
          className="w-full my-4 h-14 text-lg"
          size="lg"
        >
          {isLoading || makeOrderMutation.isPending
            ? "Processing..."
            : `Pay ${total}`}
        </Button>
      </div>
    </>
  );
};

export default CheckoutForm;
