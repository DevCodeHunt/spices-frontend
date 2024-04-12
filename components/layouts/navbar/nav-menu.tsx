import { navItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavMenu = () => {
  const pathname = usePathname();
  return (
    <div className="w-full h-14 border-b md:block hidden">
      <div className="flex items-center gap-4 container h-full">
      {navItems.map((item, index) => (
        <Link key={index} href={item.path} className={`uppercase font-medium text-sm ${pathname === item.name ? "text-primary" : ""}`}>
          {item.name}
        </Link>
      ))}
    </div>
    </div>
  );
};

export default NavMenu;
