"use client";

import useUserMutation from "@/hooks/mutations/useUserMutation";
import { formatPrice } from "@/lib/format";
import { calculateCartTotals, calculateDiscountedPrice } from "@/lib/helper";
import { CartItem } from "@/types";
import Image from "next/image";
import React from "react";
import AddToCart from "./AddToCart";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import AnimationWrapper from "./AnimationWrapper";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";

const Carts = () => {
  const { user } = useAppSelector(UserState);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleDecrementCart,
    handleIncrementCart,
    handleRemoveFromCart,
    handleRemoveAllFromCart,
  } = useUserMutation();
  const carts = user?.carts as CartItem[];
  const {subTotal, totalDiscount, total} = calculateCartTotals(carts);

  const handleCheckout = () => {
    if(!carts?.length) {
      enqueueSnackbar("Please add items to the cart", { variant: "error" });
      return
    }
    router.push('/checkout')
  }
  return (
    <>
      {carts && carts?.length > 0 ? (
        <div className="flex md:flex-row flex-col gap-8">
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between bg-primary/10 rounded-lg p-4">
              <h1 className="text-2xl font-bold font-sans">
                My Shopping Cart ({carts.length})
              </h1>
              <button
                onClick={handleRemoveAllFromCart}
                className="text-red-700"
              >
                Remove All
              </button>
            </div>
            <div className="space-y-8">
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
                  calculateDiscountedPrice(product.price, product.discountPrice) * quantity
                );
                const originalPrice = formatPrice(price * quantity);
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: index * 0.08 }}
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
                        <h3 className="text-lg font-medium text-gray-700">
                          {name}
                        </h3>

                        {discountPrice > 0 && (
                          <div className="flex items-center gap-3 my-2">
                            <p className="p-1 bg-red-100 text-xs rounded text-red-600 font-medium">
                              {discountPrice}%
                            </p>
                            <del className="text-gray-500 font-medium">
                              {originalPrice}
                            </del>
                          </div>
                        )}
                        <p className="text-lg font-semibold">{disPrice}</p>
                      </div>
                    </div>

                    <div className="flex min-[468px]:flex-col justify-between">
                      <AddToCart
                        small
                        quantity={quantity}
                        increment={() => handleIncrementCart(productId)}
                        decrement={() => handleDecrementCart(productId)}
                      />

                      <button
                        onClick={() => handleRemoveFromCart(productId)}
                        className="flex items-center gap-2 text-gray-600 min-[468px]:mx-auto min-[468px]:pb-2"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </AnimationWrapper>
                );
              })}
            </div>
          </div>

          <div className="md:w-[350px] h-max p-4 rounded-lg shadow border">
            <h1 className="text-xl font-bold font-sans">Order Summary</h1>
            <div className="my-4">
              <h3 className="text-sm font-semibold mb-1 pl-2">Promo Code</h3>
              <div className="relative border rounded-full h-11 border-gray-300">
                <Input
                  placeholder="Type here..."
                  className="rounded-full w-[calc(100%_-_3.7rem)] pr-9 border-0 h-full"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 h-9  bg-primary text-white text-sm px-6  rounded-full">
                  Apply
                </button>
              </div>
              {/* <small className="text-red-600 pl-4">Error of code</small> */}
            </div>

            <Separator className="my-4 bg-gray-300" />

            {/* Calculation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between opacity-60 font-medium">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </div>
              <div className="flex items-center justify-between opacity-60 font-medium">
                <span>Discount</span>
                <span>{totalDiscount}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>{total}</span>
              </div>
              <Button onClick={handleCheckout} className="w-full !mt-6">Continue To Checkout</Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold font-sans">
            My Shopping Cart ({carts?.length})
          </h1>
          <div className="py-8 border-t border-b flex flex-col items-center my-8">
            <p className="text-sm text-center">
              No products added to the shopping cart
            </p>

            <Link
              href="/products"
              className="mx-auto mt-6 bg-primary text-white font-medium px-6 py-3 rounded-lg cursor-pointer text-sm"
            >
              Shop Now
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Carts;
