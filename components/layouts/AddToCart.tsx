"use client";

import { Minus, Plus } from "lucide-react";
import React from "react";

interface AddToCartProps {
  increment: () => void;
  decrement: () => void;
  quantity: number;
  small?: boolean;
}
const AddToCart: React.FC<AddToCartProps> = ({
  increment,
  decrement,
  quantity,
  small = false,
}) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={decrement}
        className={`${
          small ? "w-10 h-10" : "w-12 h-12"
        } flex items-center justify-center border border-r-0 border-gray-300`}
      >
        <Minus size={18} />
      </button>
      <span
        className={`${
          small ? "w-10 h-10" : "w-12 h-12"
        } flex items-center justify-center border-t border-b border-gray-300`}
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={increment}
        className={`${
          small ? "w-10 h-10" : "w-12 h-12"
        } flex items-center justify-center border border-l-0 border-gray-300`}
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default AddToCart;
