"use client";

import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useAuthMutation from "@/hooks/mutations/useAuthMutation";
import { CustomError } from "@/types";

const SendVerificationMailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { verificationMailMutation, sendVerificationMailMutation } =
    useAuthMutation();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    const verifyToken = () => {
      verificationMailMutation.mutate(token as string);
    };

    verifyToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const resendMail = () => {
    const formData = new FormData();
    formData.append("email", email as string);
    sendVerificationMailMutation.mutate(formData);
  };

  const error = (verificationMailMutation.error as CustomError)?.response?.data
    .message;

  return (
    <AnimationWrapper>
      <section className="py-8 px-4 my-20">
        {verificationMailMutation.isError && error === "Token expired" ? (
          <div className="max-w-lg w-full mx-auto flex flex-col items-center justify-center">
            <h1 className="text-center sm:text-4xl text-3xl break-all font-bold">
              Your Token has been expired
            </h1>
            <p className="text-center text-sm my-4">
              To activate your acoount click the button below to resend the mail
              for activate your account.
            </p>
            <Button
              disabled={sendVerificationMailMutation.isPending}
              onClick={resendMail}
            >
              Resend
            </Button>
          </div>
        ) : (
          verificationMailMutation.isError && <>
          <h2 className="text-center mb-8 text-xl font-semibold">Error</h2>
          <div className="flex flex-col items-center justify-center">
            <FaExclamationCircle className="sm:text-[200px] text-[150px] text-red-600" />
            <p className="text-center text-lg text-gray-600 my-3">{error}</p>
          </div>
        </>
        )}
        {verificationMailMutation.isSuccess && (
          <div className="max-w-lg w-full mx-auto">
            <h2 className="text-center mb-8 text-xl font-semibold">
              Account Activated
            </h2>
            <div className="flex flex-col items-center justify-center">
              <FaCheckCircle className="sm:text-[200px] text-[150px] text-green-600" />
              <p className="text-center text-sm text-gray-600 my-3">
                Thank you, your email has been successfully verified. Your
                account is now active. Please use the below to login to your
                account.
              </p>

              <div className="mt-3">
                <Button onClick={() => router.push("/signin")}>
                  Login To Your Account
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </AnimationWrapper>
  );
};

export default SendVerificationMailPage;
