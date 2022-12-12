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

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Project;
  createTicket: Ticket;
  createUser: User;
  removeProject: Project;
  removeTicketById: Ticket;
  removeUserByUsername: User;
  updateTicketById: Ticket;
  updateUserByUsername: User;
};


export type MutationCreateProjectArgs = {
  description?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  managerList?: InputMaybe<Array<UserInput>>;
  name?: InputMaybe<Scalars['String']>;
  projectUrl?: InputMaybe<Scalars['String']>;
};


export type MutationCreateTicketArgs = {
  event?: InputMaybe<Scalars['String']>;
  participant: Scalars['String'];
};


export type MutationCreateUserArgs = {
  address?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInput>>;
  participatedProjects?: InputMaybe<Array<ProjectInput>>;
  role?: InputMaybe<Scalars['String']>;
  twitterId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationRemoveTicketByIdArgs = {
  id: Scalars['String'];
};


export type MutationRemoveUserByUsernameArgs = {
  username: Scalars['String'];
};


export type MutationUpdateTicketByIdArgs = {
  event?: InputMaybe<Scalars['String']>;
  participant: Scalars['String'];
};


export type MutationUpdateUserByUsernameArgs = {
  address?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInput>>;
  participatedProjects?: InputMaybe<Array<ProjectInput>>;
  role?: InputMaybe<Scalars['String']>;
  twitterId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Project = {
  __typename?: 'Project';
  description?: Maybe<Scalars['String']>;
  logoUrl?: Maybe<Scalars['String']>;
  managedUsers?: Maybe<Array<User>>;
  name: Scalars['String'];
  projectUrl?: Maybe<Scalars['String']>;
};

export type ProjectInput = {
  description?: InputMaybe<Scalars['String']>;
  logoUrl?: InputMaybe<Scalars['String']>;
  managerList?: InputMaybe<Array<UserInput>>;
  name?: InputMaybe<Scalars['String']>;
  projectUrl?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  project: Array<Project>;
  projects: Array<Project>;
  ticketById: Ticket;
  ticketByParticipant: Ticket;
  tickets: Array<Ticket>;
  userByUsername: User;
  users: Array<User>;
};


export type QueryProjectArgs = {
  projectName: Scalars['String'];
};


export type QueryTicketByIdArgs = {
  id: Scalars['String'];
};


export type QueryTicketByParticipantArgs = {
  username: Scalars['String'];
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type Ticket = {
  __typename?: 'Ticket';
  event?: Maybe<Scalars['String']>;
  participatedUser: User;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Scalars['String']>;
  discordId?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  managedProjects?: Maybe<Array<Project>>;
  participatedProjects?: Maybe<Array<Project>>;
  role?: Maybe<Scalars['String']>;
  twitterId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserInput = {
  address?: InputMaybe<Scalars['String']>;
  discordId?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  managedProjects?: InputMaybe<Array<ProjectInput>>;
  participatedProjects?: InputMaybe<Array<ProjectInput>>;
  role?: InputMaybe<Scalars['String']>;
  twitterId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type GetUsersQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQueryQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username: string }> };


export const GetUsersQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetUsersQueryQuery, GetUsersQueryQueryVariables>;