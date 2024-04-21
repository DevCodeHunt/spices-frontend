import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../_components/Topbar";
import AllProducts from "../_components/products/AllProducts";
import ProductTable from "../_components/products/ProductTable";

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
      <ProductTable />
    </AnimationWrapper>
  );
};

export default ProductsPage;
