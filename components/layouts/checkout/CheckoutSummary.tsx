"use client";

import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { calculateCartTotals, calculateDiscountedPrice } from "@/lib/helper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { OrderState, setPaymentMethod } from "@/redux/slices/orderSlice";
import { UserState } from "@/redux/slices/userSlice";
import { CartItem } from "@/types";
import { Banknote, CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";
import {SiRazorpay } from "react-icons/si";

const CheckoutSummary = () => {
  const dispatch = useAppDispatch();
  const { paymentMethod } = useAppSelector(OrderState);
  const { user } = useAppSelector(UserState);
  const carts = user?.carts as CartItem[];
  const { subTotal, totalDiscount, total } = calculateCartTotals(carts);

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold">Summary Order</h2>
        <p className="text-gray-700 mb-6">
          Check your item and select your shipping for better experience order
          them
        </p>
        {/* <span>{carts?.length} items</span> */}

        <div className="space-y-4 my-4">
          {carts?.map((item: CartItem, index: number) => {
            const { product, quantity } = item;
            const {
              images,
              name,
              price,
              discountPrice,
              _id: productId,
            } = product;
            const image = images[0];

            const disPrice = formatPrice(
              calculateDiscountedPrice(product.price, product.discountPrice) *
                quantity
            );
            const originalPrice = formatPrice(price * quantity);
            return (
              <div
                key={index}
                className="rounded-lg flex min-[468px]:flex-row flex-col min-[468px]:gap-2 gap-4  justify-between"
              >
                <div className="flex gap-4">
                  <Image
                    src={image.url}
                    alt={image.id}
                    width={400}
                    height={400}
                    priority={false}
                    className="w-[100px] h-[100px] rounded-lg"
                  />

                  <div>
                    <h3 className="text-lg font-medium">{name}</h3>

                    <p className="my-2 text-gray-600 font-medium">
                      Qty: {quantity}
                    </p>

                    <p className="text-lg font-medium text-gray-800">
                      {disPrice}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Separator className="my-4 bg-gray-300" />
      <div className="space-y-4">
        <div
          onClick={() => dispatch(setPaymentMethod("CashOnDelivery"))}
          className="border border-gray-600 rounded-lg p-4 py-6 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Banknote className="rotate-12" />
            <span className="font-medium">Cash On Delivery</span>
          </div>

          <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-800">
            {paymentMethod === "CashOnDelivery" && (
              <div className="w-3 h-3 rounded-full bg-black"></div>
            )}
          </div>
        </div>

        <div
          onClick={() => dispatch(setPaymentMethod("Card"))}
          className="border border-gray-600 rounded-lg p-4 py-6 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <CreditCard  />
            <span className="font-medium">Debit/Credit Card</span>
          </div>

          <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-800">
            {paymentMethod === "Card" && (
              <div className="w-3 h-3 rounded-full bg-black"></div>
            )}
          </div>
        </div>
       
        <div
          onClick={() => dispatch(setPaymentMethod("Razorpay"))}
          className="border border-gray-600 rounded-lg p-4 py-6 flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <SiRazorpay size={24}   />
            <span className="font-medium">Razorpay</span>
          </div>

          <div className="w-6 h-6 rounded-full flex items-center justify-center border border-gray-800">
            {paymentMethod === "Razorpay" && (
              <div className="w-3 h-3 rounded-full bg-black"></div>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
};

export default CheckoutSummary;
