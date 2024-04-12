"use client";

import useSidebarStore from "@/store/sidebar-store";
import { Menu } from "lucide-react";
import React from "react";

const Navbar = () => {
  const { onOpen } = useSidebarStore();
  return (
    <div className="h-14 border-b border-b-gray-100 bg-white w-full flex items-center justify-between px-4 fixed top-0 right-0 md:left-72">
      <button onClick={onOpen} className="md:hidden block">
        <Menu />
      </button>
    </div>
  );
};

export default Navbar;
