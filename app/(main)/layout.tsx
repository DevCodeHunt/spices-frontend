import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import DataProvider from "@/providers/DataProvider";
import React from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </DataProvider>
  );
};

export default MainLayout;
