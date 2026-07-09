"use client";

import { Toaster } from "sonner";

import { AppQueryProvider } from "@/lib/query-client";
import { ThemeProvider } from "@/components/theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AppQueryProvider>
        {children}
        <Toaster richColors position="top-right" />
      </AppQueryProvider>
    </ThemeProvider>
  );
}
