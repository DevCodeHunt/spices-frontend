"use client";

import React from "react";
import { SnackbarProvider } from "notistack";

const ToastPrivider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      {children}
    </SnackbarProvider>
  );
};

export default ToastPrivider;
