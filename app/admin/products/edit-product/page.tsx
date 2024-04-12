import AnimationWrapper from '@/components/layouts/AnimationWrapper';
import React from 'react'
import Topbar from '../../_components/Topbar';

const EditProductPage = () => {
    const breadcrumbs = [
        {
          text: "Products",
          href: "/admin/products",
        },
        {
            text: "Edit Product",
            href: "/admin/products/edit-product",
        }
      ];
    
      return (
        <AnimationWrapper>
          <Topbar breadcrumbs={breadcrumbs} title="Edit Product" />
          Products
        </AnimationWrapper>
      );
}

export default EditProductPage