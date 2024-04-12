import AnimationWrapper from '@/components/layouts/AnimationWrapper';
import React from 'react'
import Topbar from '../_components/Topbar';

const UsersPage = () => {
  const breadcrumbs = [
    {
      text: "Users",
      href: "/admin/users",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Users" />
      Products
    </AnimationWrapper>
  );
}

export default UsersPage