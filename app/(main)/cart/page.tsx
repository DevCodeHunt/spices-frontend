import AnimationWrapper from '@/components/layouts/AnimationWrapper'
import Carts from '@/components/layouts/Carts'
import React from 'react'

const CartPage = () => {
  return (
    <AnimationWrapper>
      <section className='py-8 container'>
        <Carts />
      </section>
    </AnimationWrapper>
  )
}

export default CartPage