import {
  SUPPORTED_NETWORKS,
  SupportedNetwork,
  Ticket,
  WALLET_NAMES,
} from "../type";
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
  } else if (
    network === SUPPORTED_NETWORKS.STACKS ||
    network === ChainType.Stacks
  ) {
    return SUPPORTED_NETWORKS.STACKS;
  }
  return SUPPORTED_NETWORKS.UNKNOWN;
};

const convertToWalletName = (value: string) => {
  const idx = Object.values(WALLET_NAMES)
    .map((e) => e.toString())
    .indexOf(value);
  if (idx < 0) return undefined;
  return Object.values(WALLET_NAMES)[idx];
};

const convertToChainType = (network: SupportedNetwork | string) => {
  if (typeof network === "string") {
    network = convertToSuppoertedNetwork(network);
  }
  if (network === SUPPORTED_NETWORKS.APTOS) {
    return ChainType.Aptos;
  } else if (network === SUPPORTED_NETWORKS.SUI) {
    return ChainType.Sui;
  } else if (network === SUPPORTED_NETWORKS.EVM) {
    return ChainType.Evm;
  } else if (network === SUPPORTED_NETWORKS.STACKS) {
    return ChainType.Stacks;
  }
  return ChainType.Evm;
};

const isSupportedNetwork = (chainName: string) => {
  const _chainName = chainName.toLowerCase();
  if (
    Object.values(SUPPORTED_NETWORKS)
      .map((e) => e.toString())
      .includes(_chainName)
  )
    return true;
  if (
    _chainName === "polygon" ||
    _chainName === "bnb" ||
    _chainName === "optimism" ||
    _chainName === "avax"
  ) {
    return true;
  }
  return false;
};

const filterFeatureEventTickets = (ticketsData: Ticket[]) => {
  return ticketsData
    ?.filter((ticket) =>
      [
        "6445ef8e7cf8560dd56dafc3",
        "63bfd87b73405e8b13784612",
        "63dbe4a4540fe0675585ecfa",
        "6401a2967fd0d869b923f3df",
        "6401a74edebaef951761e7ad",
      ].includes(ticket._id ?? "")
    )
    .sort((a, b) => {
      return (a?.project?.name ?? "") > (b?.project?.name ?? "") ? -1 : 1;
    });
};

export {
  convertToSuppoertedNetwork,
  convertToChainType,
  convertToWalletName,
  filterFeatureEventTickets,
};
