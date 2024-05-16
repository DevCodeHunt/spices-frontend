import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import ProductDetail from "@/components/layouts/ProductDetail";
import React from "react";

const ProductDetailPage = ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  return (
    <AnimationWrapper>
      <section className="container py-16">
        <ProductDetail productId={productId} />
      </section>
    </AnimationWrapper>
  );
};

export default ProductDetailPage;
