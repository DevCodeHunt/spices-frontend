"use client"

import LoginForm from "@/components/auth/LoginForm";
import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import { useAppSelector } from "@/redux/hooks";
import { UserState } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import React from "react";

const SignInPage = () => {
  const { isAuth} = useAppSelector(UserState);
  const router = useRouter()

  React.useEffect(() => {
    if (isAuth) {
      router.push("/")
    }
  }, [isAuth, router])
  
  return (
    <AnimationWrapper>
      <section className="py-8 px-4">
        <LoginForm />
      </section>
    </AnimationWrapper>
  );
};

export default SignInPage;
