"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import { PropsWithChildren, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import AmplitudeProvider from "./(providers)/amplitude.provider";
import { UserProvider } from "./(providers)/user.provider";

import { client as apolloclient } from "@/lib/apollo/client";
import { createTheme } from "@/theme";

export default function Providers({ children }: PropsWithChildren) {
  const theme = useMemo(createTheme, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AmplitudeProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <RecoilRoot>
              <ApolloProvider client={apolloclient}>{children}</ApolloProvider>
            </RecoilRoot>
          </UserProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AmplitudeProvider>
  );
}
