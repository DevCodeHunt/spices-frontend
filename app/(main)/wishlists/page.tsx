import AnimationWrapper from '@/components/layouts/AnimationWrapper'
import Wishlists from '@/components/layouts/Wishlists'
import React from 'react'

const WishlistsPage = () => {
  return (
    <AnimationWrapper>
      <section className='py-8 container'>
        <Wishlists />
      </section>
    </AnimationWrapper>
  )
}

export default WishlistsPage