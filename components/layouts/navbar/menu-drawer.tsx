import { Button } from "@/components/ui/button";
import { navItems } from "@/constants";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback } from "react";

const MenuDrawer = ({
  onClose,
  setOpen,
}: {
  onClose: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClose = useCallback(() => {
    setTimeout(() => setOpen(false), 200);
  }, [setOpen]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 md:hidden block">
      <div className="bg-white w-72 rounded-r h-screen fixed left-0 top-0 bottom-0">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} />
        </button>

        <div className="flex  flex-col gap-4 container mt-16">
          {navItems.map((item, index) => (
            <Link
              key={index}
              onClick={handleClose}
              href={item.path}
              className={`uppercase font-medium ${
                pathname === item.name ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 mt-8">
          <Button
            onClick={() => {
              router.push("/signin");
              handleClose();
            }}
            className="w-full"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              router.push("/signup");
              handleClose();
            }}
            variant="outline"
            className="w-full"
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MenuDrawer;
