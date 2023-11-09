"use client";

import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export default function Providers({ children }: PropsWithChildren) {
  const theme = useMemo(createTheme, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
}
