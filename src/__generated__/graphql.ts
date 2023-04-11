/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AptosRequestClaimNftResponse = {
  __typename?: 'AptosRequestClaimNFTResponse';
  txHash: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  accessToken?: Maybe<Scalars['String']>;
};

export enum CategoryType {
  Defi = 'DEFI',
  Layer1 = 'LAYER1',
  Layer2 = 'LAYER2',
  Nft = 'NFT'
}

export enum ChainType {
  Aptos = 'APTOS',
  Evm = 'EVM'
}

export type IsCompletedQuestByUserIdResponse = {
  __typename?: 'IsCompletedQuestByUserIdResponse';
  isCompleted: Scalars['Boolean'];
  questId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkAndUpdateWinner: Ticket;
  completeQuestOfUser: Quest;
  createProject: Project;
  createTicket: Ticket;
  createUserByEmail: User;
  createUserByGmail: User;
  createUserByWallet: User;
  participateTicketOfUser: Ticket;
  removeProject: Project;
  removeTicketById: Ticket;
  removeUserByName: User;
  requestClaimNFT: AptosRequestClaimNftResponse;
  updateProject: Project;
  updateTicketById: Ticket;
  updateUserByName: User;
  verify3ridgePoint: Quest;
  verifyAptosQuest: Quest;
  verifyTwitterFollowQuest: Quest;
  verifyTwitterLikingQuest: Quest;
  verifyTwitterRetweetQuest: Quest;
};


export type MutationCheckAndUpdateWinnerArgs = {
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCompleteQuestOfUserArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  projectSocial?: InputMaybe<ProjectSocialInputType>;
};


export type MutationCreateTicketArgs = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  project?: InputMaybe<Scalars['String']>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  title?: InputMaybe<Scalars['String']>;
  untilTime?: InputMaybe<Scalars['DateTime']>;
};


export type MutationCreateUserByEmailArgs = {
  email: Scalars['String'];
};


export type MutationCreateUserByGmailArgs = {
  gmail: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserByWalletArgs = {
  address: Scalars['String'];
  chain: ChainType;
};


export type MutationParticipateTicketOfUserArgs = {
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationRemoveTicketByIdArgs = {
  ticketId: Scalars['String'];
};


export type MutationRemoveUserByNameArgs = {
  name: Scalars['String'];
};


export type MutationRequestClaimNftArgs = {
  collectionName: Scalars['String'];
  nftTokenName: Scalars['String'];
  receiverAddress: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
  projectSocial?: InputMaybe<ProjectSocialInputType>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};


export type MutationUpdateTicketByIdArgs = {
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<UserInputType>>;
  project?: InputMaybe<Scalars['String']>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  ticketId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  untilTime?: InputMaybe<Scalars['DateTime']>;
  winners?: InputMaybe<Array<UserInputType>>;
};


export type MutationUpdateUserByNameArgs = {
  name: Scalars['String'];
  userUpdateInput: UserUpdateInput;
};


export type MutationVerify3ridgePointArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationVerifyAptosQuestArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationVerifyTwitterFollowQuestArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationVerifyTwitterLikingQuestArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationVerifyTwitterRetweetQuestArgs = {
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<CategoryType>>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  managedUsers?: Maybe<Array<User>>;
  name: Scalars['String'];
  projectSocial?: Maybe<ProjectSocial>;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectInputType = {
  _id?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name: Scalars['String'];
  projectSocial?: InputMaybe<ProjectSocialInputType>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};

export type ProjectSocial = {
  __typename?: 'ProjectSocial';
  discordUrl?: Maybe<Scalars['String']>;
  officialUrl?: Maybe<Scalars['String']>;
  telegramUrl?: Maybe<Scalars['String']>;
  twitterUrl?: Maybe<Scalars['String']>;
};

export type ProjectSocialInputType = {
  discordUrl?: InputMaybe<Scalars['String']>;
  officialUrl?: InputMaybe<Scalars['String']>;
  telegramUrl?: InputMaybe<Scalars['String']>;
  twitterUrl?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  auth: AuthResponse;
  availableTickets: Array<Ticket>;
  checkTokenBalanceByWalletAddress: Scalars['Float'];
  completedTickets: Array<Ticket>;
  findMissedTickets: Array<Ticket>;
  findQuestById: Quest;
  findRankByUserId: Scalars['Float'];
  isCompletedQuestByUserId: IsCompletedQuestByUserIdResponse;
  isCompletedTicket: Scalars['Boolean'];
  isFollowTwitterByUserId: User;
  isLikingTweetByUserId: User;
  isRetweetedTwitterByUserId: User;
  isRewardClaimed: Scalars['Boolean'];
  projectById: Project;
  projectByName: Array<Project>;
  projects: Array<Project>;
  ticketById: Ticket;
  tickets: Array<Ticket>;
  ticketsByProjectId: Array<Ticket>;
  userByEmail: User;
  userByGmail: User;
  userByName: User;
  userByWalletAddress: User;
  users: Array<User>;
  usersOrderByRewardPointDesc: Array<User>;
};


export type QueryAuthArgs = {
  userId: Scalars['String'];
};


export type QueryCheckTokenBalanceByWalletAddressArgs = {
  collectionName: Scalars['String'];
  receiverAddress: Scalars['String'];
  tokenName: Scalars['String'];
};


export type QueryFindQuestByIdArgs = {
  questId: Scalars['String'];
};


export type QueryFindRankByUserIdArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  userId: Scalars['String'];
};


export type QueryIsCompletedQuestByUserIdArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsCompletedTicketArgs = {
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsFollowTwitterByUserIdArgs = {
  targetTwitterUsername: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsLikingTweetByUserIdArgs = {
  targetTweetId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsRetweetedTwitterByUserIdArgs = {
  targetTweetId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsRewardClaimedArgs = {
  ticketId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryProjectByIdArgs = {
  projectId: Scalars['String'];
};


export type QueryProjectByNameArgs = {
  projectName: Scalars['String'];
};


export type QueryTicketByIdArgs = {
  ticketId: Scalars['String'];
};


export type QueryTicketsArgs = {
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
};


export type QueryTicketsByProjectIdArgs = {
  projectId: Scalars['String'];
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};


export type QueryUserByGmailArgs = {
  gmail: Scalars['String'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String'];
};


export type QueryUserByWalletAddressArgs = {
  walletAddress: Scalars['String'];
};


export type QueryUsersOrderByRewardPointDescArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Quest = {
  __typename?: 'Quest';
  _id?: Maybe<Scalars['String']>;
  completedUsers?: Maybe<Array<User>>;
  description?: Maybe<Scalars['String']>;
  questPolicy?: Maybe<QuestPolicy>;
  title?: Maybe<Scalars['String']>;
};

export type QuestInputType = {
  _id?: InputMaybe<Scalars['String']>;
  completedUsers?: InputMaybe<Array<UserInputType>>;
  description?: InputMaybe<Scalars['String']>;
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  title?: InputMaybe<Scalars['String']>;
};

export type QuestPolicy = {
  __typename?: 'QuestPolicy';
  context: Scalars['String'];
  questPolicy: QuestPolicyType;
};

export type QuestPolicyInputType = {
  context: Scalars['String'];
  questPolicy: QuestPolicyType;
};

export enum QuestPolicyType {
  Quiz = 'QUIZ',
  Verify_3RidgePoint = 'VERIFY_3RIDGE_POINT',
  VerifyAptosBridgeToAptos = 'VERIFY_APTOS_BRIDGE_TO_APTOS',
  VerifyAptosExistTx = 'VERIFY_APTOS_EXIST_TX',
  VerifyAptosHasAns = 'VERIFY_APTOS_HAS_ANS',
  VerifyAptosHasNft = 'VERIFY_APTOS_HAS_NFT',
  VerifyDiscord = 'VERIFY_DISCORD',
  VerifyTwitterFollow = 'VERIFY_TWITTER_FOLLOW',
  VerifyTwitterLiking = 'VERIFY_TWITTER_LIKING',
  VerifyTwitterRetweet = 'VERIFY_TWITTER_RETWEET'
}

export type RewardPolicy = {
  __typename?: 'RewardPolicy';
  context: Scalars['String'];
  rewardPoint: Scalars['Float'];
  rewardPolicyType: RewardPolicyType;
};

export type RewardPolicyInputType = {
  context: Scalars['String'];
  rewardPoint: Scalars['Float'];
  rewardPolicyType: RewardPolicyType;
};

export enum RewardPolicyType {
  Fcfs = 'FCFS',
  LuckyDraw = 'LUCKY_DRAW'
}

export type Ticket = {
  __typename?: 'Ticket';
  _id?: Maybe<Scalars['String']>;
  beginTime?: Maybe<Scalars['DateTime']>;
  completed?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  participantCount?: Maybe<Scalars['Float']>;
  participants?: Maybe<Array<User>>;
  project?: Maybe<Project>;
  quests?: Maybe<Array<Quest>>;
  rewardClaimedUsers?: Maybe<Array<User>>;
  rewardPolicy?: Maybe<RewardPolicy>;
  title?: Maybe<Scalars['String']>;
  untilTime?: Maybe<Scalars['DateTime']>;
  winners?: Maybe<Array<User>>;
};

export type TicketInputType = {
  _id?: InputMaybe<Scalars['String']>;
  beginTime?: InputMaybe<Scalars['DateTime']>;
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  participantCount?: InputMaybe<Scalars['Float']>;
  participants?: InputMaybe<Array<UserInputType>>;
  project?: InputMaybe<ProjectInputType>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardClaimedUsers?: InputMaybe<Array<UserInputType>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  title?: InputMaybe<Scalars['String']>;
  untilTime?: InputMaybe<Scalars['DateTime']>;
  winners?: InputMaybe<Array<UserInputType>>;
};

export enum TicketSortType {
  Newest = 'NEWEST',
  Trending = 'TRENDING'
}

export enum TicketStatusType {
  All = 'ALL',
  Available = 'AVAILABLE',
  Completed = 'COMPLETED',
  Missed = 'MISSED'
}

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gmail?: Maybe<Scalars['String']>;
  managedProjects?: Maybe<Array<Project>>;
  name?: Maybe<Scalars['String']>;
  participatingTickets?: Maybe<Array<Ticket>>;
  profileImageUrl?: Maybe<Scalars['String']>;
  rewardPoint?: Maybe<Scalars['Float']>;
  userSocial?: Maybe<UserSocial>;
  wallets?: Maybe<Array<UserWallet>>;
};

export type UserInputType = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gmail?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInputType>>;
  name?: InputMaybe<Scalars['String']>;
  participatingTickets?: InputMaybe<Array<TicketInputType>>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  rewardPoint?: InputMaybe<Scalars['Float']>;
  userSocial?: InputMaybe<UserSocialInputType>;
  wallets?: InputMaybe<Array<UserWalletInputType>>;
};

export type UserSocial = {
  __typename?: 'UserSocial';
  twitterId?: Maybe<Scalars['String']>;
};

export type UserSocialInputType = {
  twitterId?: InputMaybe<Scalars['String']>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  gmail?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  rewardPoint?: InputMaybe<Scalars['Float']>;
  userSocial?: InputMaybe<UserSocialInputType>;
  wallets?: InputMaybe<Array<UserWalletInputType>>;
};

export type UserWallet = {
  __typename?: 'UserWallet';
  address: Scalars['String'];
  chain: ChainType;
};

export type UserWalletInputType = {
  address: Scalars['String'];
  chain: ChainType;
};

export type GetUsersOrderByRewardPointDescQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
}>;


export type GetUsersOrderByRewardPointDescQuery = { __typename?: 'Query', usersOrderByRewardPointDesc: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null }> };

export type FindRankByUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type FindRankByUserIdQuery = { __typename?: 'Query', findRankByUserId: number };

export type GetUserByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetUserByNameQuery = { __typename?: 'Query', userByName: { __typename?: 'User', _id?: string | null, email?: string | null, gmail?: string | null, name?: string | null, profileImageUrl?: string | null, rewardPoint?: number | null, participatingTickets?: Array<{ __typename?: 'Ticket', _id?: string | null, imageUrl?: string | null, description?: string | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null } };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type UserByGmailQueryVariables = Exact<{
  gmail: Scalars['String'];
}>;


export type UserByGmailQuery = { __typename?: 'Query', userByGmail: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, gmail?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type GetUserByWalletAddressQueryVariables = Exact<{
  walletAddress: Scalars['String'];
}>;


export type GetUserByWalletAddressQuery = { __typename?: 'Query', userByWalletAddress: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type CreateUserByEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateUserByEmailMutation = { __typename?: 'Mutation', createUserByEmail: { __typename?: 'User', name?: string | null } };

export type CreateUserByGmailMutationVariables = Exact<{
  gmail: Scalars['String'];
  profileImageUrl: Scalars['String'];
}>;


export type CreateUserByGmailMutation = { __typename?: 'Mutation', createUserByGmail: { __typename?: 'User', name?: string | null } };

export type CreateUserByWalletMutationVariables = Exact<{
  address: Scalars['String'];
  chain: ChainType;
}>;


export type CreateUserByWalletMutation = { __typename?: 'Mutation', createUserByWallet: { __typename?: 'User', name?: string | null } };

export type UpdateUserWalletByNameMutationVariables = Exact<{
  name: Scalars['String'];
  chain: ChainType;
  walletAddress: Scalars['String'];
}>;


export type UpdateUserWalletByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null } };

export type UpdateUserProfileImageByNameMutationVariables = Exact<{
  name: Scalars['String'];
  profileImageUrl: Scalars['String'];
}>;


export type UpdateUserProfileImageByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', profileImageUrl?: string | null } };

export type UpdateUserEmailByNameMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type UpdateUserEmailByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', email?: string | null } };

export type UpdateUserRewardByNameMutationVariables = Exact<{
  name: Scalars['String'];
  rewardPoint: Scalars['Float'];
}>;


export type UpdateUserRewardByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', rewardPoint?: number | null } };

export type UpdateUserTwitterByNameMutationVariables = Exact<{
  name: Scalars['String'];
  twitterId: Scalars['String'];
}>;


export type UpdateUserTwitterByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type TicketsQueryVariables = Exact<{
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
}>;


export type TicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id?: string | null, beginTime?: any | null, untilTime?: any | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, participants?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null } | null } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTicketByIdQuery = { __typename?: 'Query', ticketById: { __typename?: 'Ticket', _id?: string | null, beginTime?: any | null, untilTime?: any | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, participants?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null }> | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null } };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null } | null }> };

export type ProjectByIdQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null } | null } };

export type TicketsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String'];
  status?: InputMaybe<TicketStatusType>;
}>;


export type TicketsByProjectIdQuery = { __typename?: 'Query', ticketsByProjectId: Array<{ __typename?: 'Ticket', _id?: string | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, participants?: Array<{ __typename?: 'User', name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null } | null } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export type VerifyTwitterLikingQuestMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type VerifyTwitterLikingQuestMutation = { __typename?: 'Mutation', verifyTwitterLikingQuest: { __typename?: 'Quest', _id?: string | null } };

export type VerifyTwitterFollowQuestMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type VerifyTwitterFollowQuestMutation = { __typename?: 'Mutation', verifyTwitterFollowQuest: { __typename?: 'Quest', _id?: string | null } };

export type Verify3ridgePointMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type Verify3ridgePointMutation = { __typename?: 'Mutation', verify3ridgePoint: { __typename?: 'Quest', _id?: string | null } };

export type VerifyTwitterRetweetQuestMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type VerifyTwitterRetweetQuestMutation = { __typename?: 'Mutation', verifyTwitterRetweetQuest: { __typename?: 'Quest', _id?: string | null } };

export type IsCompletedQuestByUserIdQueryVariables = Exact<{
  questId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type IsCompletedQuestByUserIdQuery = { __typename?: 'Query', isCompletedQuestByUserId: { __typename?: 'IsCompletedQuestByUserIdResponse', isCompleted: boolean, questId: string } };

export type CompleteQuestOfUserMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CompleteQuestOfUserMutation = { __typename?: 'Mutation', completeQuestOfUser: { __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null } };

export type RequestClaimNftMutationVariables = Exact<{
  collectionName: Scalars['String'];
  nftTokenName: Scalars['String'];
  receiverAddress: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type RequestClaimNftMutation = { __typename?: 'Mutation', requestClaimNFT: { __typename?: 'AptosRequestClaimNFTResponse', txHash: string } };

export type VerifyAptosQuestMutationVariables = Exact<{
  questId: Scalars['String'];
  ticketId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type VerifyAptosQuestMutation = { __typename?: 'Mutation', verifyAptosQuest: { __typename?: 'Quest', _id?: string | null } };


export const GetUsersOrderByRewardPointDescDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersOrderByRewardPointDesc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOrderByRewardPointDesc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersOrderByRewardPointDescQuery, GetUsersOrderByRewardPointDescQueryVariables>;
export const FindRankByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRankByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRankByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<FindRankByUserIdQuery, FindRankByUserIdQueryVariables>;
export const GetUserByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participatingTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByNameQuery, GetUserByNameQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const UserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<UserByGmailQuery, UserByGmailQueryVariables>;
export const GetUserByWalletAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByWalletAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByWalletAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByWalletAddressQuery, GetUserByWalletAddressQueryVariables>;
export const CreateUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByEmailMutation, CreateUserByEmailMutationVariables>;
export const CreateUserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByGmailMutation, CreateUserByGmailMutationVariables>;
export const CreateUserByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;
export const UpdateUserWalletByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserWalletByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"wallets"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserWalletByNameMutation, UpdateUserWalletByNameMutationVariables>;
export const UpdateUserProfileImageByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfileImageByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileImageByNameMutation, UpdateUserProfileImageByNameMutationVariables>;
export const UpdateUserEmailByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailByNameMutation, UpdateUserEmailByNameMutationVariables>;
export const UpdateUserRewardByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserRewardByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rewardPoint"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"rewardPoint"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rewardPoint"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}}]}}]}}]} as unknown as DocumentNode<UpdateUserRewardByNameMutation, UpdateUserRewardByNameMutationVariables>;
export const UpdateUserTwitterByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserTwitterByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userSocial"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"twitterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserTwitterByNameMutation, UpdateUserTwitterByNameMutationVariables>;
export const TicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketSortType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketStatusType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"beginTime"}},{"kind":"Field","name":{"kind":"Name","value":"untilTime"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TicketsQuery, TicketsQueryVariables>;
export const GetTicketByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTicketById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"beginTime"}},{"kind":"Field","name":{"kind":"Name","value":"untilTime"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const TicketsByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketsByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketStatusType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketsByProjectId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<TicketsByProjectIdQuery, TicketsByProjectIdQueryVariables>;
export const VerifyTwitterLikingQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterLikingQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterLikingQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterLikingQuestMutation, VerifyTwitterLikingQuestMutationVariables>;
export const VerifyTwitterFollowQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterFollowQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterFollowQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterFollowQuestMutation, VerifyTwitterFollowQuestMutationVariables>;
export const Verify3ridgePointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify3ridgePoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify3ridgePoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Verify3ridgePointMutation, Verify3ridgePointMutationVariables>;
export const VerifyTwitterRetweetQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterRetweetQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterRetweetQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterRetweetQuestMutation, VerifyTwitterRetweetQuestMutationVariables>;
export const IsCompletedQuestByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsCompletedQuestByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCompletedQuestByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"questId"}}]}}]}}]} as unknown as DocumentNode<IsCompletedQuestByUserIdQuery, IsCompletedQuestByUserIdQueryVariables>;
export const CompleteQuestOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteQuestOfUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeQuestOfUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}}]}}]} as unknown as DocumentNode<CompleteQuestOfUserMutation, CompleteQuestOfUserMutationVariables>;
export const RequestClaimNftDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestClaimNFT"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nftTokenName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"receiverAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestClaimNFT"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"collectionName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionName"}}},{"kind":"Argument","name":{"kind":"Name","value":"nftTokenName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nftTokenName"}}},{"kind":"Argument","name":{"kind":"Name","value":"receiverAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"receiverAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"txHash"}}]}}]}}]} as unknown as DocumentNode<RequestClaimNftMutation, RequestClaimNftMutationVariables>;
export const VerifyAptosQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyAptosQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAptosQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyAptosQuestMutation, VerifyAptosQuestMutationVariables>;