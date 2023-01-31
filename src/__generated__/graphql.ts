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
  Evm = 'EVM'
}

export type IsCompletedQuestByUserIdResponse = {
  __typename?: 'IsCompletedQuestByUserIdResponse';
  isCompleted: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  completeQuestOfUser: Quest;
  createProject: Project;
  createTicket: Ticket;
  createUserByEmail: User;
  createUserByGmail: User;
  createUserByWallet: User;
  removeProject: Project;
  removeTicketById: Ticket;
  removeUserByName: User;
  updateProject: Project;
  updateTicketById: Ticket;
  updateUserByName: User;
  verifyTwitterFollowQuest: Quest;
  verifyTwitterRetweetQuest: Quest;
};


export type MutationCompleteQuestOfUserArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};


export type MutationCreateTicketArgs = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  quests: Array<QuestInputType>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  title?: InputMaybe<Scalars['String']>;
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


export type MutationRemoveProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationRemoveTicketByIdArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserByNameArgs = {
  name: Scalars['String'];
};


export type MutationUpdateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};


export type MutationUpdateTicketByIdArgs = {
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<UserInputType>>;
  rewardPolicy?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  winners?: InputMaybe<Array<UserInputType>>;
};


export type MutationUpdateUserByNameArgs = {
  name: Scalars['String'];
  userUpdateInput: UserUpdateInput;
};


export type MutationVerifyTwitterFollowQuestArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationVerifyTwitterRetweetQuestArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<CategoryType>>;
  description?: Maybe<Scalars['String']>;
  managedUsers?: Maybe<Array<User>>;
  name: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectInputType = {
  _id?: InputMaybe<Scalars['String']>;
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};

export type Query = {
  __typename?: 'Query';
  auth: AuthResponse;
  completedTickets: Array<Ticket>;
  findQuestById: Quest;
  inCompletedTickets: Array<Ticket>;
  isCompletedQuestByUserId: IsCompletedQuestByUserIdResponse;
  isFollowTwitterByUserId: User;
  isRetweetedTwitterByUserId: User;
  projectByName: Array<Project>;
  projects: Array<Project>;
  ticketById: Ticket;
  tickets: Array<Ticket>;
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


export type QueryFindQuestByIdArgs = {
  questId: Scalars['String'];
};


export type QueryIsCompletedQuestByUserIdArgs = {
  questId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsFollowTwitterByUserIdArgs = {
  targetTwitterUsername: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryIsRetweetedTwitterByUserIdArgs = {
  targetTweetId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryProjectByNameArgs = {
  projectName: Scalars['String'];
};


export type QueryTicketByIdArgs = {
  id: Scalars['String'];
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
  VerifyContract = 'VERIFY_CONTRACT',
  VerifyDiscord = 'VERIFY_DISCORD',
  VerifyTwitterFollow = 'VERIFY_TWITTER_FOLLOW',
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
  completed?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  participants?: Maybe<Array<User>>;
  quests?: Maybe<Array<Quest>>;
  rewardPolicy?: Maybe<RewardPolicy>;
  title?: Maybe<Scalars['String']>;
  winners?: Maybe<Array<User>>;
};

export type TicketInputType = {
  _id?: InputMaybe<Scalars['String']>;
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<UserInputType>>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  title?: InputMaybe<Scalars['String']>;
  winners?: InputMaybe<Array<UserInputType>>;
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gmail?: Maybe<Scalars['String']>;
  managedProjects?: Maybe<Array<Project>>;
  name?: Maybe<Scalars['String']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  rewardPoint?: Maybe<Scalars['Float']>;
  tickets?: Maybe<Array<Ticket>>;
  userSocial?: Maybe<UserSocial>;
  wallets?: Maybe<Array<UserWallet>>;
};

export type UserInputType = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gmail?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInputType>>;
  name?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  rewardPoint?: InputMaybe<Scalars['Float']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
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

export type GetUsersOrderByRewardPointDescQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersOrderByRewardPointDescQuery = { __typename?: 'Query', usersOrderByRewardPointDesc: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null }> };

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

export type UpdateUserTwitterByNameMutationVariables = Exact<{
  name: Scalars['String'];
  twitterId: Scalars['String'];
}>;


export type UpdateUserTwitterByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type AllTicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id?: string | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, participants?: Array<{ __typename?: 'User', name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null }> | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTicketByIdQuery = { __typename?: 'Query', ticketById: { __typename?: 'Ticket', _id?: string | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, participants?: Array<{ __typename?: 'User', name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id?: string | null, title?: string | null, description?: string | null, questPolicy?: { __typename?: 'QuestPolicy', context: string, questPolicy: QuestPolicyType } | null }> | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null } };

export type VerifyTwitterFollowQuestMutationVariables = Exact<{
  questId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type VerifyTwitterFollowQuestMutation = { __typename?: 'Mutation', verifyTwitterFollowQuest: { __typename?: 'Quest', _id?: string | null } };

export type IsFollowTwitterByUserIdQueryVariables = Exact<{
  targetTwitterUsername: Scalars['String'];
  userId: Scalars['String'];
}>;


export type IsFollowTwitterByUserIdQuery = { __typename?: 'Query', isFollowTwitterByUserId: { __typename?: 'User', _id?: string | null } };


export const GetUsersOrderByRewardPointDescDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersOrderByRewardPointDesc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOrderByRewardPointDesc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersOrderByRewardPointDescQuery, GetUsersOrderByRewardPointDescQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const UserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<UserByGmailQuery, UserByGmailQueryVariables>;
export const GetUserByWalletAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByWalletAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByWalletAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByWalletAddressQuery, GetUserByWalletAddressQueryVariables>;
export const CreateUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByEmailMutation, CreateUserByEmailMutationVariables>;
export const CreateUserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByGmailMutation, CreateUserByGmailMutationVariables>;
export const CreateUserByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;
export const UpdateUserWalletByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserWalletByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"wallets"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}]}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserWalletByNameMutation, UpdateUserWalletByNameMutationVariables>;
export const UpdateUserProfileImageByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfileImageByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileImageByNameMutation, UpdateUserProfileImageByNameMutationVariables>;
export const UpdateUserEmailByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailByNameMutation, UpdateUserEmailByNameMutationVariables>;
export const UpdateUserTwitterByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserTwitterByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userSocial"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"twitterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserTwitterByNameMutation, UpdateUserTwitterByNameMutationVariables>;
export const AllTicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AllTicketsQuery, AllTicketsQueryVariables>;
export const GetTicketByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTicketById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const VerifyTwitterFollowQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterFollowQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterFollowQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterFollowQuestMutation, VerifyTwitterFollowQuestMutationVariables>;
export const IsFollowTwitterByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsFollowTwitterByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"targetTwitterUsername"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isFollowTwitterByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"targetTwitterUsername"},"value":{"kind":"Variable","name":{"kind":"Name","value":"targetTwitterUsername"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<IsFollowTwitterByUserIdQuery, IsFollowTwitterByUserIdQueryVariables>;