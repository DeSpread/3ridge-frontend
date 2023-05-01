import { AppError } from "../error/my-error";
import React from "react";
import { SvgIconProps } from "@mui/material";
import { CategoryType } from "../__generated__/graphql";

/*
 * Per QUEST_POLICY_TYPE, It is required to implement context parsing
 * LinkingQuestContext, RetweetQuestContext
 * */

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
  APTOS: "aptos",
  SUI: "sui",
  EVM: "evm",
  UNKNOWN: "unknown",
} as const;

export type SupportedNetworks = ObjectValues<typeof SUPPORTED_NETWORKS>;

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
};

export type WalletAddressInfo = {
  address: string;
  network: SupportedNetworks;
};

export type WalletInfo = WalletAddressInfo & {
  name: string;
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

// export type WalletLoggedInInfo = {
//   address?: string;
// };

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
  nftImageUrl: string;
  collectionName: string;
  tokenName: string;
  point: number;
};

export type Ticket = {
  _id?: string;
  title?: string;
  beginTime?: string;
  untilTime?: string;
  description?: string;
  completed?: boolean;
  participants?: { _id?: string; name?: string; profileImageUrl?: string }[];
  quests?: Quest[];
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

export type Quest = {
  _id?: string;
  title?: string;
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
      | undefined;
    questPolicy?: string;
  };
  completedUsers?: User[];
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
  };
};

export const FILTER_TYPE = {
  AVAILABLE: "AVAILABLE",
  COMPLETE: "COMPLETE",
  MISSED: "MISSED",
};

export type FilterType = ObjectValues<typeof FILTER_TYPE>;
