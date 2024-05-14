import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <AnimationWrapper>
      <section className="py-8 px-4 mb-14">
        <ForgotPasswordForm />
      </section>
    </AnimationWrapper>
  );
};

export default ForgotPasswordPage;
