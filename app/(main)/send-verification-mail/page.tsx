import SendVerficationForm from '@/components/auth/SendVerficationForm'
import AnimationWrapper from '@/components/layouts/AnimationWrapper'
import React from 'react'

const SendVerificationMailPage = () => {
  return (
    <AnimationWrapper>
    <section className="py-8 px-4">
      <SendVerficationForm />
    </section>
  </AnimationWrapper>
  )
}

export default SendVerificationMailPage