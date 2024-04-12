"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

type BreadcrumbItem = {
  href: string;
  text: string;
};

type Props = {
  title: string;
  breadcrumbs: BreadcrumbItem[];
};
const Topbar = ({ title, breadcrumbs }: Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <h1 className="text-xl font-bold font-mono">{title}</h1>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbs.map((breadcrumb, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.text}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {i !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Topbar;
