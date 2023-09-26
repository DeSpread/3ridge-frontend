import { CoinbaseWalletConnector } from "@wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bsc, bscTestnet } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const projectId = "a4bf4539dce1fa48900f4518d450f7aa";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum, bsc, bscTestnet],
  [
    alchemyProvider({ apiKey: "-E5r9ZtW9VLo_AzYd1m46GfQZuet5_pM" }),
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== bsc.id && chain.id !== bscTestnet.id) {
          return null;
        }
        return chain.id === bsc.id
          ? {
              http: `https://bsc.getblock.io/f92ff3c1-8f62-4131-99db-6b6e7a763f2b/mainnet/`,
              webSocket: `wss://bsc.getblock.io/f92ff3c1-8f62-4131-99db-6b6e7a763f2b/mainnet/`,
            }
          : {
              http: `https://bsc.getblock.io/f92ff3c1-8f62-4131-99db-6b6e7a763f2b/testnet/`,
              webSocket: `wss://bsc.getblock.io/f92ff3c1-8f62-4131-99db-6b6e7a763f2b/testnet/`,
            };
      },
    }),
    publicProvider(),
  ],
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
