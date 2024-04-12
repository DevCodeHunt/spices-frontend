import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../../_components/Topbar";
import AddProductForm from "../../_components/products/add-product-form";

const AddProductPage = () => {
  const breadcrumbs = [
    {
      text: "Products",
      href: "/admin/products",
    },
    {
      text: "Add Product",
      href: "/admin/products/add-product",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="Add Product" />
      <AddProductForm />
    </AnimationWrapper>
  );
};

export default AddProductPage;
