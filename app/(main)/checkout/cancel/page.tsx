import AnimationWrapper from '@/components/layouts/AnimationWrapper'
import React from 'react'

const PaymentCancel = () => {
  return (
    <AnimationWrapper>
      <section className='bg-red-50 w-full py-10 flex flex-col items-center justify-center h-[50vh]'>
      <h2 className="text-2xl font-semibold text-red-600">
          Payment Failed
        </h2>
        <h1 className="font-bold text-3xl my-2">Your Order has been failed</h1>
       
      </section>
    </AnimationWrapper>
  )
}

export default PaymentCancel