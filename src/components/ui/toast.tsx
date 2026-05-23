"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      duration={5000}
      toastOptions={{
        classNames: {
          success: "toast-success",
          error: "toast-error",
          warning: "toast-warning",
          info: "toast-info",
        },
        style: {
          borderRadius: "16px",
          padding: "12px 16px 12px 12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        },
      }}
    />
  );
}
