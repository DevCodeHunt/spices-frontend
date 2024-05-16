"use client";

import { Rating } from "@mui/material";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import useProducts from "@/hooks/queries/useProducts";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import useUserMutation from "@/hooks/mutations/useUserMutation";
import useProfile from "@/hooks/queries/useProfile";
import { IoMdHeart } from "react-icons/io";
const Products = () => {
  const { products } = useProducts();
  const { handleAddToWishlist } = useUserMutation();
  const { user} = useProfile()

  
  return (
    <section className="py-8">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-4 gap-y-6">
        {products?.length > 0
          ? products &&
            products?.map((product: Product, index: number) => {
              const hasInWishlist = user?.wishlists?.some((item: Product) => item?._id === product._id);
              return (
                <div
                  key={index}
                  className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative overflow-hidden"
                >
                  <button
                    onClick={() => handleAddToWishlist(product._id)}
                    className="absolute top-4 right-4 border w-9 gap-4 h-9 rounded-full flex items-center justify-center bg-white 0"
                  >
                    {
                      hasInWishlist ? <IoMdHeart size={18} className="text-primary" /> : <Heart size={18} className="text-gray-600" />
                    }
                  </button>
                  <Link href={`/products/${product._id}`}>
                    <Image
                      width={300}
                      height={300}
                      className="p-8 rounded-t-lg mx-auto w-[300px] h-[300px] object-contain"
                      src={product.images[0].url}
                      alt={product.images[0].id}
                    />
                  </Link>
                  <div className="px-5 pb-5">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                      {product.name}
                    </h5>
                    <div className="flex items-center mt-2.5 mb-5">
                      <Rating
                        defaultValue={product.rating.average}
                        precision={0.5}
                        readOnly
                        size="medium"
                      />
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">
                        {product.rating.average}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </span>
                      <Button>Add to cart</Button>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </section>
  );
};

export default Products;
