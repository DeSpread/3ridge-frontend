"use client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PropsWithChildren, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";

import AmplitudeProvider from "./(providers)/amplitude.provider";
import { UserProvider } from "./(providers)/user.provider";

import { client as apolloclient } from "@/lib/apollo/client";
import { wagmiConfig } from "@/lib/wagmi/client";
import { LoginProvider } from "@/provider/login/login-provider";
import { createTheme } from "@/theme";

const googleOAuthClientId = process.env["NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID"];

export default function Providers({ children }: PropsWithChildren) {
  const theme = useMemo(createTheme, []);
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AmplitudeProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ApolloProvider client={apolloclient}>
            <WagmiConfig config={wagmiConfig}>
              <GoogleOAuthProvider clientId={googleOAuthClientId ?? ""}>
                <RecoilRoot>
                  <UserProvider>
                    <LoginProvider>{children}</LoginProvider>
                  </UserProvider>
                </RecoilRoot>
              </GoogleOAuthProvider>
            </WagmiConfig>
          </ApolloProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AmplitudeProvider>
  );
}
