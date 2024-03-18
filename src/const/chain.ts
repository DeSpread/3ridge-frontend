interface Chain {
  chainId: number;
  label: string;
  currency: string;
}

export const chains: Chain[] = [
  {
    chainId: 1,
    label: "Ethereum",
    currency: "ETH",
  },
];
