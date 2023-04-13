import "../styles/globals.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { createTheme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client as apolloClient } from "../apollo/client";
import { WagmiConfig } from "wagmi";
import { client as wagmiClient } from "../wagmi/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RecoilRoot } from "recoil";
import { LoginProvider } from "../provider/login/login-provider";
import { AlertProvider } from "../provider/alert/alert-provider";
import { LoadingProvider } from "../provider/loading/loading-provider";
import { combineProviders } from "react-combine-providers";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import * as gtag from "../lib/gtag";
import Head from "next/head";
import Script from "next/script";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/router";

const providers = combineProviders();
providers.push(LoginProvider);
providers.push(AlertProvider);
providers.push(LoadingProvider);

const MasterProvider = providers.master();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const clientId = process.env["NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID"];
  const wallets = [new PetraWallet()];
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <ThemeProvider theme={createTheme()}>
        <WagmiConfig client={wagmiClient}>
          <GoogleOAuthProvider clientId={clientId ?? ""}>
            <RecoilRoot>
              <ApolloProvider client={apolloClient}>
                <AptosWalletAdapterProvider
                  plugins={wallets}
                  autoConnect={true}
                >
                  <MasterProvider>
                    {getLayout(<Component {...pageProps} />)}
                  </MasterProvider>
                </AptosWalletAdapterProvider>
              </ApolloProvider>
            </RecoilRoot>
          </GoogleOAuthProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}
