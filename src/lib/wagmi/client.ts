// import { configureChains, createClient, defaultChains } from "wagmi";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { InjectedConnector } from "wagmi/connectors/injected";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";

import { alchemyProvider } from "wagmi/providers/alchemy";

const projectId = "a4bf4539dce1fa48900f4518d450f7aa";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum],
  [
    alchemyProvider({ apiKey: "-E5r9ZtW9VLo_AzYd1m46GfQZuet5_pM" }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ projectId, version: 1, chains }),
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "3ridge",
      },
    }),
  ],
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

export { wagmiConfig, ethereumClient, projectId };
