import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../_components/Topbar";

const OrdersPage = () => {
  const breadcrumbs = [
    {
      text: "Orders",
      href: "/admin/orders",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Orders" />
      Orders
    </AnimationWrapper>
  );
};

export default OrdersPage;
