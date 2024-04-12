"use client";

import { Rating } from "@mui/material";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

const Products = () => {
  return (
    <section className="py-8">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center gap-x-4 gap-y-6">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative overflow-hidden">
          <button className="absolute top-4 right-4 border w-9 gap-4 h-9 rounded-full flex items-center justify-center bg-white 0">
            
            <Heart size={22} className="text-gray-600" />
          </button>
          <Link href="#">
            <Image
              width={300}
              height={300}
              className="p-8 rounded-t-lg mx-auto"
              src="https://flowbite.com/docs/images/products/apple-watch.png"
              alt="product image"
            />
          </Link>
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900">
              Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
            </h5>
            <div className="flex items-center mt-2.5 mb-5">
              <Rating
                defaultValue={4.5}
                precision={0.5}
                readOnly
                size="medium"
              />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded  ms-3">
                5.0
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                $599
              </span>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
