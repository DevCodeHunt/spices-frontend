"use client";

import useProfile from "@/hooks/queries/useProfile";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DataProvider = (props: Props) => {
  useProfile();
  return <>{props.children}</>;
};

export default DataProvider;
