// import { configureChains, createClient, defaultChains } from "wagmi";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { InjectedConnector } from "wagmi/connectors/injected";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";

const chains = [arbitrum, mainnet, polygon];
const projectId = "a4bf4539dce1fa48900f4518d450f7aa";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
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

// const { chains, provider } = configureChains(
//   [...defaultChains],
//   [publicProvider()]
// );

// const client = createClient({
//   autoConnect: true,
//   connectors: [

//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   provider,
// });

export { wagmiConfig, ethereumClient, projectId };
