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

export enum CategoryType {
  Defi = 'DEFI',
  Layer1 = 'LAYER1',
  Layer2 = 'LAYER2',
  Nft = 'NFT'
}

export enum ChainType {
  Evm = 'EVM'
}

export type Mutation = {
  __typename?: 'Mutation';
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
  rewardPolicy?: InputMaybe<Scalars['String']>;
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
  chainType: ChainType;
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
  participants?: InputMaybe<Array<UserInputType>>;
  rewardPolicy?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  winners?: InputMaybe<Array<UserInputType>>;
};


export type MutationUpdateUserByNameArgs = {
  name: Scalars['String'];
  userUpdateInput: UserUpdateInput;
};

export type Project = {
  __typename?: 'Project';
  categories?: Maybe<Array<CategoryType>>;
  description?: Maybe<Scalars['String']>;
  managedUsers?: Maybe<Array<User>>;
  name: Scalars['String'];
  thumbnailUrl?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectInputType = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name: Scalars['String'];
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};

export type Query = {
  __typename?: 'Query';
  completedTickets: Array<Ticket>;
  inCompletedTickets: Array<Ticket>;
  projectByName: Array<Project>;
  projects: Array<Project>;
  ticketById: Ticket;
  tickets: Array<Ticket>;
  userByEmail: User;
  userByGmail: User;
  userByName: User;
  userByWalletAddress: User;
  users: Array<User>;
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
  completedUsers?: Maybe<Array<User>>;
  description?: Maybe<Scalars['String']>;
  questPolicy?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type QuestInputType = {
  completedUsers?: InputMaybe<Array<UserInputType>>;
  description?: InputMaybe<Scalars['String']>;
  questPolicy?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  completed?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  participants?: Maybe<Array<User>>;
  quests?: Maybe<Array<Quest>>;
  rewardPolicy?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  winners?: Maybe<Array<User>>;
};

export type TicketInputType = {
  completed?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  participants?: InputMaybe<Array<UserInputType>>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardPolicy?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  winners?: InputMaybe<Array<UserInputType>>;
};

export type User = {
  __typename?: 'User';
  discordId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gmail?: Maybe<Scalars['String']>;
  managedProjects?: Maybe<Array<Project>>;
  name: Scalars['String'];
  profileImageUrl?: Maybe<Scalars['String']>;
  tickets?: Maybe<Array<Ticket>>;
  twitterId?: Maybe<Scalars['String']>;
  wallet?: Maybe<Array<UserWallet>>;
};

export type UserInputType = {
  discordId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gmail?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInputType>>;
  name: Scalars['String'];
  profileImageUrl?: InputMaybe<Scalars['String']>;
  tickets?: InputMaybe<Array<TicketInputType>>;
  twitterId?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<Array<UserWalletInputType>>;
};

export type UserUpdateInput = {
  email?: InputMaybe<Scalars['String']>;
  gmail?: InputMaybe<Scalars['String']>;
  profileImageUrl?: InputMaybe<Scalars['String']>;
  wallet?: InputMaybe<UserWalletInput>;
};

export type UserWallet = {
  __typename?: 'UserWallet';
  address: Scalars['String'];
  chainType: ChainType;
};

export type UserWalletInput = {
  address?: InputMaybe<Scalars['String']>;
  chain?: InputMaybe<Scalars['String']>;
};

export type UserWalletInputType = {
  address: Scalars['String'];
  chainType: ChainType;
};

export type UserByGmailQueryVariables = Exact<{
  gmail: Scalars['String'];
}>;


export type UserByGmailQuery = { __typename?: 'Query', userByGmail: { __typename?: 'User', name: string, profileImageUrl?: string | null } };

export type TicketsQueryVariables = Exact<{ [key: string]: never; }>;


export type TicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', completed?: boolean | null }> };

export type CreateUserByWalletMutationVariables = Exact<{
  address: Scalars['String'];
  chainType: ChainType;
}>;


export type CreateUserByWalletMutation = { __typename?: 'Mutation', createUserByWallet: { __typename?: 'User', name: string } };

export type CreateUserByGmailMutationVariables = Exact<{
  gmail: Scalars['String'];
  profileImageUrl: Scalars['String'];
}>;


export type CreateUserByGmailMutation = { __typename?: 'Mutation', createUserByGmail: { __typename?: 'User', name: string } };


export const UserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]} as unknown as DocumentNode<UserByGmailQuery, UserByGmailQueryVariables>;
export const TicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]} as unknown as DocumentNode<TicketsQuery, TicketsQueryVariables>;
export const CreateUserByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chainType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chainType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;
export const CreateUserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByGmailMutation, CreateUserByGmailMutationVariables>;