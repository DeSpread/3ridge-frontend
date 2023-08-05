import {
  RewardContext,
  SUPPORTED_NETWORKS,
  SupportedNetwork,
  Ticket,
  User,
  WALLET_NAMES,
} from "../type";
import {
  ChainType,
  RewardPolicy,
  RewardPolicyType,
} from "../__generated__/graphql";
import DateUtil from "../util/date-util";

class TypeHelper {
  public static convertToSuppoertedNetwork = (network?: string | ChainType) => {
    if (network === SUPPORTED_NETWORKS.SUI || network === ChainType.Sui) {
      return SUPPORTED_NETWORKS.SUI;
    } else if (
      network === SUPPORTED_NETWORKS.APTOS ||
      network === ChainType.Aptos
    ) {
      return SUPPORTED_NETWORKS.APTOS;
    } else if (
      network === SUPPORTED_NETWORKS.EVM ||
      network === ChainType.Evm
    ) {
      return SUPPORTED_NETWORKS.EVM;
    } else if (
      network === SUPPORTED_NETWORKS.STACKS ||
      network === ChainType.Stacks
    ) {
      return SUPPORTED_NETWORKS.STACKS;
    }
    return SUPPORTED_NETWORKS.UNKNOWN;
  };

  public static convertToWalletName = (value: string) => {
    const idx = Object.values(WALLET_NAMES)
      .map((e) => e.toString())
      .indexOf(value);
    if (idx < 0) return undefined;
    return Object.values(WALLET_NAMES)[idx];
  };

  public static convertToChainType = (network: SupportedNetwork | string) => {
    if (typeof network === "string") {
      network = this.convertToSuppoertedNetwork(network);
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

  public static isSupportedNetwork = (chainName: string) => {
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

  public static getUserMail = (user?: User) => {
    if (user?.email) {
      return user?.email;
    } else if (user?.gmail) {
      return user?.gmail;
    }
    return undefined;
  };

  public static convertToServerRewardPolicy = (rewardPolicy: {
    context?: RewardContext;
    rewardPoint?: number;
    rewardPolicyType?: RewardPolicyType;
  }) => {
    const newRewardPolicy: RewardPolicy = {
      context: JSON.stringify(rewardPolicy.context),
      rewardPolicyType: rewardPolicy.rewardPolicyType ?? RewardPolicyType.Fcfs,
      rewardPoint: rewardPolicy.rewardPoint ?? 0,
    };
    return newRewardPolicy;
  };

  public static isTicketStarted = (ticketData?: Ticket) => {
    return ticketData?.beginTime
      ? DateUtil.isAfter(new Date(), ticketData?.beginTime)
      : false;
  };

  public static isTicketExpired = (ticketData?: Ticket) => {
    return ticketData?.untilTime
      ? DateUtil.isAfter(new Date(), ticketData?.untilTime)
      : true;
  };

  public static findQuestIndex = (ticketData?: Ticket, questId?: string) => {
    const ids = ticketData?.quests?.map((e) => {
      return e._id;
    });
    const index = ids?.indexOf(questId) as number;
    return index;
  };
}

export default TypeHelper;
