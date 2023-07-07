import "../styles/globals.css";

import React, { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { createTheme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client as apolloClient } from "../lib/apollo/client";
import { WagmiConfig } from "wagmi";
import { ethereumClient, projectId, wagmiConfig } from "../lib/wagmi/client";
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
import { WalletProvider } from "@suiet/wallet-kit";
import { v1 } from "uuid";
import { useRouter } from "next/router";
import { Web3Modal } from "@web3modal/react";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { isMobile } from "react-device-detect";
import { MobileContext } from "../provider/mobile/mobile-context";
import ErrorBoundary from "../components/error-boundary";
import { SnackbarProvider } from "../provider/snackbar/snackbar-provider";

const providers = combineProviders();
providers.push(LoginProvider);
providers.push(AlertProvider);
providers.push(LoadingProvider);
providers.push(SnackbarProvider);

const MasterProvider = providers.master();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const clientId = process.env["NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID"];
  const wallets = [new PetraWallet()];
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
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
      <Script
        src={`https://telegram.org/js/telegram-widget.js?${v1()}`}
        async
      />
      <ThemeProvider theme={createTheme()}>
        <GoogleOAuthProvider clientId={clientId ?? ""}>
          <RecoilRoot>
            <ApolloProvider client={apolloClient}>
              <WagmiConfig config={wagmiConfig}>
                <WalletProvider>
                  <AptosWalletAdapterProvider
                    plugins={wallets}
                    autoConnect={true}
                  >
                    <MobileContext.Provider value={{ isMobile }}>
                      <MasterProvider>
                        <ErrorBoundary>
                          {getLayout(<Component {...pageProps} />)}
                        </ErrorBoundary>
                      </MasterProvider>
                    </MobileContext.Provider>
                  </AptosWalletAdapterProvider>
                </WalletProvider>
              </WagmiConfig>
              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
              />
            </ApolloProvider>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
