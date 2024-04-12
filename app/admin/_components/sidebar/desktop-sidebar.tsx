import Logo from "@/components/layouts/Logo";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <div
      className={`fixed top-0 botom-0 left-0 h-screen  w-72 shadow bg-white z-50 overflow-y-auto scroll`}
    >
      <div className="h-14 border-b border-b-gray-100 flex items-center px-4">
        <Logo path="/admin" />
      </div>
      <div className="flex flex-col gap-2 mt-4 px-4 overflow-y-auto scroll">
        {sidebarLinks.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`flex items-center gap-2 hover:bg-primary/60 transition duration-300 h-11 px-2 rounded ${
              pathname === link.path ? "bg-primary/60" : ""
            }`}
          >
            <link.icon size={20} />
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
