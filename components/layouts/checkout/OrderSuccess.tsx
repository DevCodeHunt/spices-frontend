"use client";

import OrderStepper from "@/components/order/OrderStepper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import { calculateCartTotals, calculateDiscountedPrice } from "@/lib/helper";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { CartItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BsTruck } from "react-icons/bs";
import { CiMoneyBill } from "react-icons/ci";
import { RiContactsBook3Line } from "react-icons/ri";

const OrderSuccess = () => {
  const { user } = useAppSelector(UserState);
  const carts = user?.carts as CartItem[];
  const { subTotal, totalDiscount, total } = calculateCartTotals(carts);
  const paymentMethod = ""
  return (
    <div className="flex xl:flex-row flex-col">
      <div className="flex-1 bg-green-100 flex flex-col items-center pt-20 py-8 px-4">
        <h2 className="text-2xl font-semibold text-green-600">
          Payment Success
        </h2>
        <h1 className="font-bold text-3xl my-2">Your Order is confirmed</h1>
        <p className="text-gray-700">Thank you for your purchase.</p>
        <p className="text-gray-700 text-center">
          We will be sending you an email confirmation to john@gmail.com
          shortly.
        </p>
        <Button className="mt-4">Continue Shopping</Button>

        <div className="mt-10 w-full">
          <OrderStepper />
        </div>
        <Link href="/orders" className="mt-4 underline text-blue-600">Track Order</Link>
      </div>

      <div className="xl:w-[450px] bg-white shadow">
        <div className="p-4 py-6 w-full bg-blue-50 flex items-center justify-between">
          <span className="text-lg font-medium">Order Details</span>
          <span className="font-medium">#123456780987</span>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <BsTruck size={24} />
            <span className="uppercase">Delivered Address</span>
          </div>

          <div className="mt-4 flex flex-col">
            <span className="text-sm">Abc Town 123456 Ndew Delhi</span>
            <span className="text-sm">City, State (127032)</span>
            <span className="text-sm">India</span>
          </div>
        </div>
        <Separator className="bg-gray-300" />

        <div className="p-4">
          <div className="flex items-center gap-2">
            <RiContactsBook3Line size={24} />
            <span className="uppercase">Contact Detail</span>
          </div>

          <div className="mt-4 flex flex-col">
            <span className="text-sm">Pavitar Sharma</span>
            <span className="text-sm">pavitarsharma144@gmail.com</span>
            <span className="text-sm">+91234567654</span>
          </div>
        </div>

        <div className="bg-blue-50 p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">ORDER SUMMARY</h1>
            <h1 className="font-semibold">1 item(s)</h1>
          </div>

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

          <Separator className="bg-gray-300 my-4" />

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
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
