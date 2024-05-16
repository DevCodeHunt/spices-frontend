import EditProductForm from "@/app/admin/_components/products/EditProductForm";
import Topbar from "@/app/admin/_components/Topbar";
import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";

const EditProductPage = ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const breadcrumbs = [
    {
      text: "Products",
      href: "/admin/products",
    },
    {
      text: "Edit Product",
      href: "/admin/products/edit-product",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="Edit Product" />
      <EditProductForm productId={productId} />
    </AnimationWrapper>
  );
};

export default EditProductPage;
