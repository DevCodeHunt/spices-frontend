"use client"

import ResetPasswordForm from "@/components/auth/ResetPasswordForm"
import AnimationWrapper from "@/components/layouts/AnimationWrapper"
import { useSearchParams } from 'next/navigation'

const ResetPasswordPage = () => {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  return (
    <AnimationWrapper>
      <section className="py-8 px-4 mb-14">
        <ResetPasswordForm token={token as string} />
      </section>
    </AnimationWrapper>
  )
}

export default ResetPasswordPage