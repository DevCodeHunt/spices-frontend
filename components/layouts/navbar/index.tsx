"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Logo from "../Logo";
import MenuDrawer from "./menu-drawer";
import { Heart, Menu, Search, ShoppingBasket, X } from "lucide-react";
import Searchbar from "./searchbar";
import useDebounce from "@/hooks/useDebounce";
import NavMenu from "./nav-menu";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openSerach, setOpenSerach] = useState(false);
  const [navBg, setNavBg] = useState(false);
  const debounceSerach = useDebounce(searchTerm);

  const handleDrawerOpen = useCallback(() => setOpen((prev) => !prev), []);
  const onSerachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const hangeOpenSerach = useCallback(() => setOpenSerach(true), []);
  const hangeCloseSerach = useCallback(() => {
    setOpenSerach(false);
    setSearchTerm("");
  }, []);

  useEffect(() => {
    const handleNavScroll = () => {
      if (window.scrollY > 20) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };

    window.addEventListener("scroll", handleNavScroll);

    return () => {
      window.removeEventListener("scroll", handleNavScroll);
    };
  });

  return (
    <>
      <header
        className={`w-full h-16 sticky bg-white top-0 left-0 right-0 z-50 ${
          navBg ? "shadow" : "border-b"
        }`}
      >
        <div className="container relative h-full flex gap-6 items-center justify-between">
          <Logo />
          <div className="max-w-[500px] w-full md:block hidden">
            <Searchbar value={searchTerm} onChange={onSerachChange} />
          </div>

          <div
            className={`md:hidden bg-white z-10 w-full md:static absolute left-0 px-4 flex gap-4 justify-between ${
              openSerach ? "translate-y-0" : "-translate-y-[120px]"
            } transition duration-300`}
          >
            <Searchbar value={searchTerm} onChange={onSerachChange} />
            <button onClick={hangeCloseSerach}>
              <X />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={hangeOpenSerach} className="md:hidden block">
              <Search />
            </button>
            <button className="relative">
              <Heart />
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-medium">
                0
              </span>
            </button>

            <button className="relative">
              <ShoppingBasket size={24} />
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-medium">
                0
              </span>
            </button>
            <button onClick={handleDrawerOpen} className="md:hidden block">
              <Menu />
            </button>
          </div>
        </div>
      </header>
      <NavMenu />
      {open && <MenuDrawer onClose={handleDrawerOpen} setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
