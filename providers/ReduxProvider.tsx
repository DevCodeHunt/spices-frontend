"use client";

import { injectStore } from "@/lib/axios";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

injectStore(store);
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
