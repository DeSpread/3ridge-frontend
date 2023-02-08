import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
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
import { Analytics } from "@vercel/analytics/react";

import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";

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
  return (
    <ThemeProvider theme={createTheme()}>
      <WagmiConfig client={wagmiClient}>
        <GoogleOAuthProvider clientId={clientId ?? ""}>
          <RecoilRoot>
            <ApolloProvider client={apolloClient}>
              <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
                <MasterProvider>
                  {getLayout(<Component {...pageProps} />)}
                  <Analytics />
                </MasterProvider>
              </AptosWalletAdapterProvider>
            </ApolloProvider>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
