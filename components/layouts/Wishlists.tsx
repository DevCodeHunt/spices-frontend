"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/format";
import { calculateDiscountedPrice } from "@/lib/helper";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { Product } from "@/types";
import { ShoppingCart, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
import AnimationWrapper from "./AnimationWrapper";
import Link from "next/link";
import useUserMutation from "@/hooks/mutations/useUserMutation";

const Wishlists = () => {
  const { user } = useAppSelector(UserState);
  const wishlists = user?.wishlists;
  const { handleAddToWishlist, handleRemoveAllWishlist } = useUserMutation();

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">
          My Wishlists ({wishlists?.length})
        </h2>
        {wishlists && wishlists?.length > 0 ? (
          <div className="flex items-center sm:gap-6 gap-4">
            <button className="">Add Wishlits To cart</button>
            <button onClick={handleRemoveAllWishlist} className="text-red-600">Remove All</button>
          </div>
        ) : null}
      </div>
      {wishlists && wishlists?.length > 0 ? (
        <div className="w-full overflow-auto scrollbar">
          <Table className="md:w-full w-[900px]">
            <TableCaption>A list of your recent wishlists.</TableCaption>
            <TableHeader className=" uppercase">
              <TableRow>
                <TableHead className="px-6 py-3 text-gray-900 font-semibold text-center">
                  S.No.
                </TableHead>
                <TableHead className="px-6 py-3 text-gray-900 font-semibold text-center">
                  Image
                </TableHead>
                <TableHead className="px-6 py-3 text-gray-900 font-semibold text-center">
                  Name
                </TableHead>
                <TableHead className="px-6 py-3 text-gray-900 font-semibold text-center">
                  Price
                </TableHead>
                <TableHead className="tpx-6 py-3 text-gray-900 font-semibold text-center">
                  AVALIBILITY
                </TableHead>
                <TableHead className="tpx-6 py-3 text-gray-900 font-semibold text-center">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wishlists &&
                wishlists.length > 0 &&
                wishlists.map((product: Product, index: number) => {
                  const image = product.images[0];
                  const { name, stock, price, discountPrice } = product;
                  const originalPrice = formatPrice(
                    calculateDiscountedPrice(price, discountPrice)
                  );

                  return (
                    <TableRow key={product._id}>
                      <TableCell className="font-semibold text-center">
                        <AnimationWrapper
                          key={product._id}
                          transition={{ duration: 1, delay: index * 0.08 }}
                        >
                          {index + 1}
                        </AnimationWrapper>
                      </TableCell>
                      <TableCell className="text-center">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: index * 0.08 }}
                        >
                          <Link href={`/products/${product._id}`}>
                            <Image
                              src={image.url}
                              alt={image.id}
                              width={100}
                              height={100}
                              className="rounded mx-auto"
                            />
                          </Link>
                        </AnimationWrapper>
                      </TableCell>
                      <TableCell className="font-semibold text-center">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: index * 0.08 }}
                        >
                          {name}
                        </AnimationWrapper>
                      </TableCell>
                      <TableCell className="text-center">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: index * 0.08 }}
                        >
                          {originalPrice}
                        </AnimationWrapper>
                      </TableCell>
                      <TableCell
                        className={`text-center font-semibold ${
                          stock > 0 ? "text-primary" : "text-red-600"
                        }`}
                      >
                        <AnimationWrapper
                          transition={{ duration: 1, delay: index * 0.08 }}
                        >
                          {stock > 0 ? "In Stock" : "Out Of Stock"}
                        </AnimationWrapper>
                      </TableCell>
                      <TableCell className="text-center space-x-2">
                        <AnimationWrapper
                          transition={{ duration: 1, delay: index * 0.08 }}
                          className="text-center space-x-2"
                        >
                          <button className="bg-primary text-white py-2 px-4 rounded-md">
                            <ShoppingCart size={20} />
                          </button>
                          <button
                            onClick={() => handleAddToWishlist(product._id)}
                            className="bg-secondary-foreground text-white py-2 px-4 rounded-md"
                          >
                            <Trash size={20} />
                          </button>
                        </AnimationWrapper>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="py-8 border-t border-b">
          <p className="text-sm text-center">
            No products added to the wishlist
          </p>
        </div>
      )}
    </>
  );
};

export default Wishlists;
