import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import CheckoutForm from "@/components/layouts/checkout/CheckoutForm";
import CheckoutSummary from "@/components/layouts/checkout/CheckoutSummary";
import React from "react";

const CheckoutPage = () => {
  return (
    <AnimationWrapper>
      <section className="py-8 container flex justify-center gap-8">
        <div className="md:w-[550px] h-max shadow border rounded-lg p-4">
          <CheckoutSummary />
        </div>
        <div className="md:w-[550px] h-max shadow border rounded-lg p-4">
          <CheckoutForm />
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default CheckoutPage;
