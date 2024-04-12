import AnimationWrapper from "@/components/layouts/AnimationWrapper";
import React from "react";
import Topbar from "../_components/Topbar";

const BlogsPage = () => {
  const breadcrumbs = [
    {
      text: "Blogs",
      href: "/admin/blogs",
    },
  ];

  return (
    <AnimationWrapper>
      <Topbar breadcrumbs={breadcrumbs} title="All Blogs" />
      Blogs
    </AnimationWrapper>
  );
};

export default BlogsPage;
