import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "./_components/navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="md:ml-auto md:w-[calc(100%_-_18rem)] w-full min-h-screen">
          <Navbar />
          <div className="p-4 bg-gray-50 h-full mt-[56px]">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
