import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../_components/Topbar";

const ProductsPage = () => {
  const breadcrumbs = [
    {
      text: "Products",
      href: "/admin/products",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Products" />
      Products
    </AnimationWrapper>
  );
};

export default ProductsPage;
