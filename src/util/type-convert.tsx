import { SUPPORTED_NETWORKS, SupportedNetworks } from "../type";
import { ChainType } from "../__generated__/graphql";

const convertToSuppoertedNetwork = (network?: string | ChainType) => {
  if (network === SUPPORTED_NETWORKS.SUI || network === ChainType.Sui) {
    return SUPPORTED_NETWORKS.SUI;
  } else if (
    network === SUPPORTED_NETWORKS.APTOS ||
    network === ChainType.Aptos
  ) {
    return SUPPORTED_NETWORKS.APTOS;
  } else if (network === SUPPORTED_NETWORKS.EVM || network === ChainType.Evm) {
    return SUPPORTED_NETWORKS.EVM;
  }
  return SUPPORTED_NETWORKS.UNKNOWN;
};

const convertToChainType = (network: SupportedNetworks | string) => {
  if (typeof network === "string") {
    network = convertToSuppoertedNetwork(network);
  }
  if (network === SUPPORTED_NETWORKS.APTOS) {
    return ChainType.Aptos;
  } else if (network === SUPPORTED_NETWORKS.SUI) {
    return ChainType.Sui;
  } else if (network === SUPPORTED_NETWORKS.EVM) {
    return ChainType.Evm;
  }
  return ChainType.Evm;
};

export { convertToSuppoertedNetwork, convertToChainType };
