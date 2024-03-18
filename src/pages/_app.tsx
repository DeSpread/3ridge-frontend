import "@/styles/tailwindcss.css";
import "@/styles/globals.css";
import "prismjs/themes/prism-tomorrow.css";

import { ApolloProvider } from "@apollo/client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WalletProvider } from "@suiet/wallet-kit";
import { Web3Modal } from "@web3modal/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import React, { ReactElement, ReactNode, useEffect, useMemo } from "react";
import { combineProviders } from "react-combine-providers";
import { isMobile } from "react-device-detect";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { v1 } from "uuid";
import { WagmiConfig } from "wagmi";

import ErrorBoundary from "../components/error-boundary";
import * as gtag from "../lib/gtag";
import { ethereumClient, projectId, wagmiConfig } from "../lib/wagmi/client";
import { AlertProvider } from "../provider/alert/alert-provider";
import { LoadingProvider } from "../provider/loading/loading-provider";
import { LoginProvider } from "../provider/login/login-provider";
import { MobileContext } from "../provider/mobile/mobile-context";
import { SnackbarProvider } from "../provider/snackbar/snackbar-provider";
import { createTheme } from "../theme";

import AmplitudeProvider from "@/app/(providers)/amplitude.provider";
import { UserProvider } from "@/app/(user)/user.provider";
import { client as apolloClient } from "@/lib/apollo/client";
import ConfirmProvider from "@/provider/confirm/confirm-provider";
import { Z_INDEX_OFFSET } from "@/types";

const providers = combineProviders();
providers.push(LoginProvider);
providers.push(AlertProvider);
providers.push(ConfirmProvider);
providers.push(LoadingProvider);
providers.push(SnackbarProvider);

const MasterProvider = providers.master();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const queryClient = new QueryClient();

declare global {
  // Kakao 함수를 전역에서 사용할 수 있도록 선언
  interface Window {
    Kakao: any;
  }
}

const App = (props: AppPropsWithLayout) => {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);
  const clientId = process.env["NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID"];
  const wallets = [new PetraWallet()];
  const router = useRouter();
  const theme = useMemo(createTheme, []);

  function kakaoInit() {
    // 페이지가 로드되면 실행
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    console.log(window.Kakao.isInitialized());
  }

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
      <Script
        src="https://storage.googleapis.com/al-web-sdk/al.min.js"
        onLoad={() => {
          if (window) {
            if (!("ALSDK" in window)) {
              (window as any).ALSDK = { siteId: "42e420e7" };
            } else {
              (window as any).ALSDK.siteId = "42e420e7";
            }
          }
        }}
      />
      <Script id="gtag-and-alsdk">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });

            window.ALSDK = window.ALSDK || {}; window.ALSDK.siteId = '42e420e7';
          `}
      </Script>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        src={`https://telegram.org/js/telegram-widget.js?${v1()}`}
        async
      />
      <Script
        src="https://developers.kakao.com/sdk/js/kakao.js"
        onLoad={kakaoInit}
      ></Script>
      <AmplitudeProvider>
        <ThemeProvider theme={theme}>
          <GoogleOAuthProvider clientId={clientId ?? ""}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <RecoilRoot>
                <ApolloProvider client={apolloClient}>
                  <WagmiConfig config={wagmiConfig}>
                    <QueryClientProvider client={queryClient}>
                      <WalletProvider>
                        <UserProvider>
                          <AptosWalletAdapterProvider
                            plugins={wallets}
                            // autoConnect={true}
                          >
                            <MobileContext.Provider value={{ isMobile }}>
                              <MasterProvider>
                                <ErrorBoundary>
                                  {getLayout(<Component {...pageProps} />)}
                                </ErrorBoundary>
                              </MasterProvider>
                            </MobileContext.Provider>
                          </AptosWalletAdapterProvider>
                        </UserProvider>
                      </WalletProvider>
                    </QueryClientProvider>
                  </WagmiConfig>
                  <Web3Modal
                    themeVariables={{
                      "--w3m-z-index": String(
                        theme.zIndex.modal + Z_INDEX_OFFSET.DIALOG,
                      ),
                    }}
                    projectId={projectId}
                    ethereumClient={ethereumClient}
                  />
                </ApolloProvider>
              </RecoilRoot>
            </LocalizationProvider>
          </GoogleOAuthProvider>
        </ThemeProvider>
      </AmplitudeProvider>
    </>
  );
};

export default App;
