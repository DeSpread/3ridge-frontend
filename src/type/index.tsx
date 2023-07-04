import { AppError } from "../error/my-error";
import React from "react";
import { SvgIconProps } from "@mui/material";
import { CategoryType, ContentMetadata } from "../__generated__/graphql";

/*
 * Per QUEST_POLICY_TYPE, It is required to implement context parsing
 * LinkingQuestContext, RetweetQuestContext
 * */
export const LOG_LEVEL = {
  INFO: "info",
  DEBUG: "debug",
  ERROR: "error",
};

export type LogLevel = ObjectValues<typeof LOG_LEVEL>;

export type ComponentRenderFunc = (src?: string) => JSX.Element;

export type SuccessErrorCallback<T> = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (msg?: T) => void;
  onError?: (error: AppError) => void;
}) => void;

export type SuccessErrorCallbackWithParam<T, K> = (
  t: T,
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (msg?: K) => void;
    onError?: (error: AppError) => void;
  }
) => void;

export interface MouseEventWithParam<T> extends React.MouseEvent<HTMLElement> {
  params: T;
}

export const SUPPORTED_NETWORKS = {
  EVM: "evm",
  APTOS: "aptos",
  STACKS: "stacks",
  SUI: "sui",
  UNKNOWN: "unknown",
} as const;

export const ALLOWED_NETWORKS = [
  SUPPORTED_NETWORKS.EVM,
  SUPPORTED_NETWORKS.STACKS,
];

export const SUPPORTED_NETWORKS_VALUES = Object.values(SUPPORTED_NETWORKS)
  .filter((_, index) => index !== Object.values(SUPPORTED_NETWORKS).length - 1)
  .map((e) => e.toString());

export type SupportedNetwork = ObjectValues<typeof SUPPORTED_NETWORKS>;

export const WALLET_NAMES = {
  META_MASK: "MetaMask",
  COINBASE_WALLET: "Coinbase Wallet",
  PETRA: "petra",
  SUI_WALLET: "Sui Wallet",
  HIRO: "hiro",
  WALLET_CONNECT: "WalletConnect",
} as const;

export type WalletName = ObjectValues<typeof WALLET_NAMES>;

export const MAIL_VERIFY = {
  USER_NOT_FOUND: "USER_NOT_FOUND",
  NOT_VERIFIED: "NOT_VERIFIED",
  VERIFIED: "VERIFIED",
  SEND_VERIFICATION: "SEND_VERIFICATION",
  PASSWORD_WRONG: "PASSWORD_WRONG",
} as const;

export type MailVerified = ObjectValues<typeof MAIL_VERIFY>;

export type ObjectValues<T> = T[keyof T];

export const Z_INDEX_OFFSET = {
  NAV_LAYOUT: 1,
  DIALOG: 2,
  LOADING_BACKDROP: 3,
};

export const REWARD_POLICY_TYPE = {
  FCFS: "FCFS",
  LUCKY_DRAW: "LUCKY_DRAW",
  ALL: "ALL",
};

export const QUEST_POLICY_TYPE = {
  QUIZ: "QUIZ",
  VERIFY_TWITTER_RETWEET: "VERIFY_TWITTER_RETWEET",
  VERIFY_TWITTER_FOLLOW: "VERIFY_TWITTER_FOLLOW",
  VERIFY_TWITTER_LIKING: "VERIFY_TWITTER_LIKING",
  VERIFY_DISCORD: "VERIFY_DISCORD",
  VERIFY_TELEGRAM: "VERIFY_TELEGRAM",
  VERIFY_3RIDGE_POINT: "VERIFY_3RIDGE_POINT",
  VERIFY_APTOS_BRIDGE_TO_APTOS: "VERIFY_APTOS_BRIDGE_TO_APTOS",
  VERIFY_APTOS_HAS_NFT: "VERIFY_APTOS_HAS_NFT",
  VERIFY_APTOS_EXIST_TX: "VERIFY_APTOS_EXIST_TX",
  VERIFY_APTOS_HAS_ANS: "VERIFY_APTOS_HAS_ANS",
  VERIFY_VISIT_WEBSITE: "VERIFY_VISIT_WEBSITE",
};

export type WalletAddressInfo = {
  address: string;
  network: SupportedNetwork;
};

export type WalletInfo = WalletAddressInfo & {
  name: WalletName;
};

export type PartialWalletInfo = Partial<WalletInfo>;

export type PartialWalletAddressInfo = Partial<WalletAddressInfo>;

export type TelegramUserInfo = {
  authDate: number;
  firstName: string;
  hash: string;
  id: number;
  photoUrl: string;
  username: string;
};

export type User = {
  _id?: string;
  walletAddressInfos?: WalletAddressInfo[];
  name?: string;
  email?: string;
  gmail?: string;
  profileImageUrl?: string;
  rewardPoint?: number;
  userSocial?: { twitterId?: string; telegramUser?: TelegramUserInfo };
  participatingTickets?: PartialTicket[];
};

export type GoogleLoggedInInfo = {
  gmail?: string;
};

export type EmailLoggedInInfo = {
  mail?: string;
};

export type EmailSignUpEventParams = {
  email: string;
  password: string;
};

export type ReversibleSvgIconProps = SvgIconProps & {
  reverse?: boolean;
};

export type MouseEventWithStateParam = MouseEventWithParam<{ state?: string }>;

export type FCFSRewardContext = {
  limitNumber: number;
  beginTime: string;
  untilTime: string;
  rewardUnit: string;
  rewardAmount: number;
  rewardChain: string;
  rewardNetwork: string;
  rewardClaimable: boolean;
  nftImageUrl: string;
  collectionName: string;
  tokenName: string;
  point: number;
  rewardName?: string;
  rewardInfo?: {
    title: string;
    contentFormatType: string;
    content: string;
  };
};

export type ParticipantInfo = {
  _id?: string;
  name?: string;
  profileImageUrl?: string;
};

export type Ticket = {
  _id?: string;
  title?: string;
  beginTime?: string;
  untilTime?: string;
  description?: string;
  description_v2?: ContentMetadata;
  completed?: boolean;
  participants?: { _id?: string; name?: string; profileImageUrl?: string }[];
  participantCount?: number;
  quests?: PartialQuest[];
  imageUrl?: string;
  rewardPolicy?: {
    context?: FCFSRewardContext | undefined;
    rewardPolicyType?: string;
  };
  winners?: {
    _id?: string;
    name?: string;
  }[];
  project?: PartialProject;
  rewardClaimedUserIds?: string[];
};

export type PartialProject = Partial<Project>;

export type PartialTicket = Partial<Ticket>;

export type PartialQuest = Partial<Quest>;

export type Quest = {
  _id?: string;
  title?: string;
  title_v2?: ContentMetadata;
  description?: string;
  questPolicy?: {
    context?:
      | QuizQuestContext
      | TwitterLikingQuestContext
      | TwitterRetweetQuestContext
      | TwitterFollowQuestContext
      | DiscordQuestContext
      | TelegramQuestContext
      | Verify3ridgePointContext
      | VerifyHasEmailContext
      | VerifyHasWalletAddressContext
      | VerifyHasTwitter
      | VerifyHasTelegram
      | VerifyVisitWebsiteContext
      | undefined;
    questPolicy?: string;
  };
  completedUsers?: User[];
  questGuides?: ContentMetadata[];
  isComplete?: boolean;
};

export type TwitterLikingQuestContext = {
  tweetId: string;
  twitterUrl: string;
  username: string;
};

export type TwitterRetweetQuestContext = {
  tweetId: string;
  twitterUrl: string;
  username: string;
};

export type TwitterFollowQuestContext = {
  username: string;
  twitterUrl: string;
};

export type DiscordQuestContext = {
  channelId: string;
};

export type TelegramQuestContext = {
  channelId: string;
};

export type Verify3ridgePointContext = {
  point: number;
};

export type VerifyHasEmailContext = {};

export type VerifyHasTwitter = {};

export type VerifyHasTelegram = {};

export type VerifyVisitWebsiteContext = {
  url: string;
};

export type VerifyHasWalletAddressContext = {
  chain: string;
};

export type QuizQuestContext = {
  quizList?: QuizContent[];
};

export type QuizContent = {
  title: string;
  options: string[];
  correctOptionIndex: number;
};

export type QuizEventParam = {
  correct: boolean;
};

export type TicketEventParam = {
  ticket: Ticket;
};

export type Project = {
  _id: string;
  categories: CategoryType[];
  description: string;
  imageUrl: string;
  name: string;
  projectSocial: {
    discordUrl: string;
    officialUrl: string;
    telegramUrl: string;
    twitterUrl: string;
    mediumUrl: string;
  };
};

export const FILTER_TYPE = {
  AVAILABLE: "AVAILABLE",
  COMPLETE: "COMPLETE",
  MISSED: "MISSED",
  ALL: "ALL",
};

export type FilterType = ObjectValues<typeof FILTER_TYPE>;
