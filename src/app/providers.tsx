"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import { client as apolloclient } from "@/lib/apollo/client";

export default function Providers({ children }: PropsWithChildren) {
  const theme = useMemo(createTheme, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ApolloProvider client={apolloclient}>{children}</ApolloProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
