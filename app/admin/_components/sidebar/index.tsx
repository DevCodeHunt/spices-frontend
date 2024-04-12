"use client";

import React from "react";
import MobileSidebar from "./mobile-sidebar";
import DesktopSidebar from "./desktop-sidebar";
import { useMediaQuery } from "react-responsive";

const Sidebar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
};

export default Sidebar;
