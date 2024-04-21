"use client";

import { Input } from "@/components/ui/input";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TableSerach: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="relative w-full">
      <IoSearchOutline className="absolute top-1/2 -translate-y-1/2 left-2" />

      <Input
        value={value}
        onChange={onChange}
        placeholder="Search..."
        className="pl-8"
      />
    </div>
  );
};

export default TableSerach;
