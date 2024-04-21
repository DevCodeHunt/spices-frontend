import RegisterForm from "@/components/auth/RegisterForm";
import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";

const SignUpPage = () => {
  return (
    <AnimationWrapper>
      <section className="py-8 px-4">
        <RegisterForm />
      </section>
    </AnimationWrapper>
  );
};

export default SignUpPage;
