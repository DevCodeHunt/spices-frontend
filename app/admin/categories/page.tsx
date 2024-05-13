import AnimationWrapper from '@/components/layouts/AnimationWrapper';
import React from 'react'
import Topbar from '../_components/Topbar';
import AllCategories from '../_components/categories/AllCategories';

const CategoriesPage = () => {
  const breadcrumbs = [
    {
      text: "Categories",
      href: "/admin/categories",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Categories" />
      <AllCategories />
    </AnimationWrapper>
  );
}

export default CategoriesPage