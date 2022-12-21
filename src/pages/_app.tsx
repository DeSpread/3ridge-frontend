import "../styles/globals.css";
import type { PropsWithChildren, ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { createTheme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client as apolloClient } from "../apollo/client";
import { WagmiConfig } from "wagmi";
import { client as wagmiClient } from "../wagmi/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { LoginProvider } from "../provider/login/login-provider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const clientId = process.env["NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID"];

  return (
    <ThemeProvider theme={createTheme()}>
      <WagmiConfig client={wagmiClient}>
        <GoogleOAuthProvider clientId={clientId ?? ""}>
          <RecoilRoot>
            <ApolloProvider client={apolloClient}>
              {/*-- my provider should be below here --*/}
              <LoginProvider>
                {getLayout(<Component {...pageProps} />)}
              </LoginProvider>
            </ApolloProvider>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
