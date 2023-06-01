import "../styles/globals.css";

import React, { ReactElement, ReactNode, useEffect } from "react";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import type { NextPage, NextPageContext } from "next";
import { createTheme } from "../theme";
import { ThemeProvider } from "@mui/material/styles";
import { ApolloProvider } from "@apollo/client";
import { client as apolloClient } from "../lib/apollo/client";
import { WagmiConfig } from "wagmi";
import { client as wagmiClient } from "../lib/wagmi/client";
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

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { isMobile } from "react-device-detect";
import { MobileContext } from "../provider/mobile/mobile-context";

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
        <meta property="og:url" content="https://3ridge.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="3ridge : Web3 온보딩 플랫폼" />
        <meta
          property="og:description"
          content="여러분의 웹3를 위한 여정, 웹3 온보딩 플랫폼 3ridge에 시작하세요"
        />
        <meta
          property="og:image"
          content="https://3ridge.s3.ap-northeast-2.amazonaws.com/opengraph/3ridge-opengraph.png"
        />
        <meta property="og:image:alt" content="3ridge : Web3 온보딩 플랫폼" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="3ridge : Web3 온보딩 플랫폼" />
        <meta
          name="twitter:description"
          content="여러분의 웹3를 위한 여정, 웹3 온보딩 플랫폼 3ridge에 시작하세요"
        />
        <meta name="twitter:site" content="@3ridge_io" />
        <meta name="twitter:creator" content="@3ridge_io" />
        <meta
          name="twitter:image"
          content="https://3ridge.s3.ap-northeast-2.amazonaws.com/opengraph/3ridge-opengraph.png"
        />

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
              <WagmiConfig client={wagmiClient}>
                <WalletProvider>
                  <AptosWalletAdapterProvider
                    plugins={wallets}
                    autoConnect={true}
                  >
                    <MobileContext.Provider value={{ isMobile }}>
                      <MasterProvider>
                        {getLayout(<Component {...pageProps} />)}
                      </MasterProvider>
                    </MobileContext.Provider>
                  </AptosWalletAdapterProvider>
                </WalletProvider>
              </WagmiConfig>
            </ApolloProvider>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
