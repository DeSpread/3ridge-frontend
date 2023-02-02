import { AppError } from "../error/my-error";
import React from "react";
import { SvgIconProps } from "@mui/material";

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
};

export const QUEST_POLICY_TYPE = {
  QUIZ: "QUIZ",
  VERIFY_TWITTER_RETWEET: "VERIFY_TWITTER_RETWEET",
  VERIFY_TWITTER_FOLLOW: "VERIFY_TWITTER_FOLLOW",
};

export type User = {
  _id?: string;
  walletAddress?: string;
  name?: string;
  email?: string;
  profileImageUrl?: string;
  rewardPoint?: number;
  userSocial?: { twitterId: string };
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

export type WalletLoggedInInfo = {
  address?: string;
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
  rewardChain: number;
  nftImageUrl: string;
  collectionName: string;
  tokenName: string;
  point: number;
};

export type Ticket = {
  _id?: string;
  title?: string;
  description?: string;
  completed?: boolean;
  participants?: { name?: string; profileImageUrl?: string }[];
  quests?: Quest[];
  imageUrl?: string;
  rewardPolicy?: {
    context?: FCFSRewardContext | undefined;
    rewardPolicyType?: string;
  };
  winners?: {
    name?: string;
  }[];
};

export type Quest = {
  _id?: string;
  title?: string;
  description?: string;
  questPolicy?: {
    context?:
      | QuizQuestContext
      | RetweetQuestContext
      | FollowQuestContext
      | undefined;
    questPolicy?: string;
  };
  completedUsers?: User[];
  isComplete?: boolean;
};

export type RetweetQuestContext = {
  tweetId: string;
  twitterUrl: string;
  username: string;
};

export type FollowQuestContext = {
  username: string;
  twitterUrl: string;
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
