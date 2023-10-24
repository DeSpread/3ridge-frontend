import {
  AllTicketsQuery,
  ChainType,
  RewardPolicy,
  RewardPolicyType,
} from "../__generated__/graphql";
import {
  RewardContext,
  SUPPORTED_NETWORKS,
  SupportedNetwork,
  Ticket,
  User,
  WALLET_NAMES,
} from "../types";
import { ItemOfArray } from "../types/utill";
import DateUtil from "../util/date-util";

import TypeParseHelper from "./type-parse-helper";

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

  public static convertChainTypeToId = (chainType: ChainType) => {
    switch (chainType) {
      case ChainType.Bnb:
        return 56;
      case ChainType.BnbTestnet:
        return 97;
    }
    return -1;
  };

  public static convertTicket = (
    ticket: ItemOfArray<AllTicketsQuery["tickets"]>,
  ) => {
    return {
      _id: ticket._id ?? undefined,
      beginTime: ticket.beginTime ?? undefined,
      untilTime: ticket.untilTime ?? undefined,
      title: ticket.title ?? undefined,
      description: ticket.description ?? undefined,
      description_v2: ticket.description_v2 ?? undefined,
      completed: ticket.completed ?? undefined,
      participants: ticket.participants?.map((_e) => {
        return {
          _id: _e._id ?? undefined,
          name: _e.name ?? undefined,
          profileImageUrl: _e.profileImageUrl ?? undefined,
        };
      }),
      // participantCount: ticket.participantCount ?? undefined,
      imageUrl: ticket.imageUrl ?? undefined,
      quests: ticket.quests?.map((_e) => {
        return {
          _id: _e._id ?? undefined,
          title: _e.title ?? undefined,
          title_v2: _e.title_v2 ?? undefined,
          description: _e.description ?? undefined,
          questPolicy: {
            context: TypeParseHelper.parseQuestPolicy(
              _e.questPolicy?.context,
              _e.questPolicy?.questPolicy,
            ),
            questPolicy: _e.questPolicy?.questPolicy ?? undefined,
          },
          isComplete: false,
        };
      }),
      rewardPolicy: {
        context: TypeParseHelper.parseRewardPolicy(
          ticket.rewardPolicy?.context ?? undefined,
          ticket.rewardPolicy?.rewardPolicyType ?? undefined,
        ),
        rewardPoint: ticket.rewardPolicy?.rewardPoint ?? undefined,
        rewardPolicyType: ticket.rewardPolicy?.rewardPolicyType ?? undefined,
      },
      winners: ticket.winners?.map((_e) => {
        return {
          name: _e.name ?? undefined,
        };
      }),
      project: {
        _id: ticket.project?._id ?? "",
        categories: ticket.project?.categories ?? [],
        description: ticket.project?.description ?? "",
        imageUrl: ticket.project?.imageUrl ?? "",
        name: ticket.project?.name ?? "",
        projectSocial: {
          discordUrl: ticket.project?.projectSocial?.discordUrl ?? "",
          officialUrl: ticket.project?.projectSocial?.officialUrl ?? "",
          telegramUrl: ticket.project?.projectSocial?.telegramUrl ?? "",
          twitterUrl: ticket.project?.projectSocial?.twitterUrl ?? "",
          mediumUrl: ticket.project?.projectSocial?.mediumUrl ?? "",
          naverBlogUrl: ticket.project?.projectSocial?.naverBlogUrl ?? "",
          kakaoUrl: ticket.project?.projectSocial?.kakaoUrl ?? "",
        },
      },
      visible: ticket.visible,
    };
  };
}

export default TypeHelper;
