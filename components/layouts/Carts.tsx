"use client";

import useUserMutation from "@/hooks/mutations/useUserMutation";
import { formatPrice } from "@/lib/format";
import { calculateDiscountedPrice } from "@/lib/helper";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { CartItem } from "@/types";
import Image from "next/image";
import React from "react";
import AddToCart from "./AddToCart";
import { Trash2 } from "lucide-react";
import Link from "next/link";

const Carts = () => {
  const { user } = useAppSelector(UserState);
  const {
    handleDecrementCart,
    handleIncrementCart,
    handleRemoveFromCart,
    handleRemoveAllFromCart,
  } = useUserMutation();
  const carts = user?.carts as CartItem[];
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
                  calculateDiscountedPrice(product.price, product.discountPrice)
                );
                const originalPrice = formatPrice(price);
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
                        className="w-[100px] h-[100px] rounded-lg"
                      />

                      <div>
                        <h3 className="text-lg font-medium text-gray-700">
                          {name}
                        </h3>

                        <div className="flex items-center gap-3 my-2">
                          <p className="p-1 bg-red-100 text-xs rounded text-red-600 font-medium">
                            {discountPrice}%
                          </p>
                          <del className="text-gray-500 font-medium">
                            {originalPrice}
                          </del>
                        </div>
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
                        className="flex items-center gap-2 text-gray-600 min-[468px]:mx-auto"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:w-[350px] h-max p-4 rounded shadow"></div>
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
