import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../_components/Topbar";
import BannerTable from "../_components/banners/BannerTable";

const BannersPage = () => {
  const breadcrumbs = [
    {
      text: "Banners",
      href: "/admin/banners",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Banners" />
      <BannerTable />
    </AnimationWrapper>
  );
};

export default BannersPage;
