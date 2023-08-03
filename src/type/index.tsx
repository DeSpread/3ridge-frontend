import { AppError } from "../error/my-error";
import React from "react";
import { SvgIconProps } from "@mui/material";
import {
  CategoryType,
  ChainType,
  ContentMetadata,
  QuestPolicyType,
  RewardPolicyType,
} from "../__generated__/graphql";

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
  EVM: "EVM",
  APTOS: "APTOS",
  STACKS: "STACKS",
  SUI: "SUI",
  UNKNOWN: "UNKNOWN",
} as const;

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

export type RewardContext = {
  limitNumber: number;
  rewardUnit: string;
  rewardAmount: number;
  rewardChain: string;
  rewardClaimable: boolean;
  overrideRewardChainContent?: ContentMetadata;
  nftImageUrl: string;
  rewardName?: string;
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
    context?: RewardContext;
    rewardPoint?: number;
    rewardPolicyType?: RewardPolicyType;
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
      | VerifyTwitterLikingQuestContext
      | VerifyTwitterRetweetQuestContext
      | VerifyTwitterFollowQuestContext
      | VerifyDiscordQuestContext
      | VerifyTelegramQuestContext
      | Verify3ridgePointQuestContext
      | VerifyHasEmailQuestContext
      | VerifyHasWalletAddressQuestContext
      | VerifyHasTwitterQuestContext
      | VerifyHasTelegramQuestContext
      | VerifyVisitWebsiteQuestContext
      | undefined;
    questPolicy?: QuestPolicyType;
  };
  completedUsers?: User[];
  questGuides?: ContentMetadata[];
  isComplete?: boolean;
};

export type VerifyTwitterLikingQuestContext = {
  tweetId: string;
  twitterUrl: string;
  username: string;
};

export type VerifyTwitterRetweetQuestContext = {
  tweetId: string;
  twitterUrl: string;
  username: string;
};

export type VerifyTwitterFollowQuestContext = {
  username: string;
  twitterUrl: string;
};

export type VerifyDiscordQuestContext = {
  channelId: string;
};

export type VerifyTelegramQuestContext = {
  channelId: string;
};

export type Verify3ridgePointQuestContext = {
  point: number;
};

export type VerifyHasEmailQuestContext = {};

export type VerifyHasTwitterQuestContext = {};

export type VerifyHasTelegramQuestContext = {};

export type VerifyVisitWebsiteQuestContext = {
  url: string;
};

export type VerifyHasWalletAddressQuestContext = {
  chain: string;
};

export type VerifyAgreementQuestContext = {
  agreementList?: AgreementContent[];
};

export type AgreementContent = {
  title: ContentMetadata;
  options: string[];
  correctOptionIndex: number;
};

export type AgreementEventParam = {
  correct: boolean;
};

export type QuizQuestContext = {
  quizList?: QuizContent[];
};

export type QuizContent = {
  title: string;
  options: string[];
  correctOptionIndex: number;
};

export type VerifySurveyQuestContext = {
  questions: string[];
};

// ---

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
    naverBlogUrl: string;
  };
};

export const FILTER_TYPE = {
  AVAILABLE: "AVAILABLE",
  COMPLETE: "COMPLETE",
  MISSED: "MISSED",
  ALL: "ALL",
};

export type FilterType = ObjectValues<typeof FILTER_TYPE>;

export type TicketUserQuery = {
  includeWalletChainType?: ChainType;
  includeTwitterId?: boolean;
  includeEmail?: boolean;
  includeTelegram?: boolean;
};
