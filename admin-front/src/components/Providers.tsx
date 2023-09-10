"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <NextUIProvider>
              {children}
          </NextUIProvider>
        </SessionProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default Providers;
