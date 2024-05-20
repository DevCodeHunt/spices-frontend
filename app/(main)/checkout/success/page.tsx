import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import OrderSuccess from "@/components/layouts/checkout/OrderSuccess";
import React from "react";

const PaymentSuccess = () => {
  return (
    <AnimationWrapper>
      <section className="">
        <OrderSuccess />
      </section>
    </AnimationWrapper>
  );
};

export default PaymentSuccess;
