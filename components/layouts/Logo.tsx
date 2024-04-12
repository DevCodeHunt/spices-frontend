import Link from "next/link";
import React from "react";

const Logo = ({ path = "/" }: { path?: string }) => {
  return (
    <Link href={path}>
      <span className="text-3xl font-bold relative after:content-[''] after:absolute after:-right-3 after:bottom-2 after:w-2 after:h-2 after:rounded-full after:bg-black">Spices</span>
    </Link>
  );
};

export default Logo;
