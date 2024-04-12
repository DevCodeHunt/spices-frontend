import { navItems } from "@/constants";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useCallback } from "react";

const MenuDrawer = ({
  onClose,
  setOpen,
}: {
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const handleClose = useCallback(() => {
    setTimeout(() => setOpen(false), 200);
  }, [setOpen]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 md:hidden block">
      <div className="bg-white w-72 rounded-r h-screen fixed left-0 top-0 bottom-0">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} />
        </button>

        <div className="flex  flex-col gap-4 container h-full mt-16">
          {navItems.map((item, index) => (
            <Link
              key={index}
              onClick={handleClose}
              href={item.path}
              className={`uppercase font-medium text-sm ${
                pathname === item.name ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
