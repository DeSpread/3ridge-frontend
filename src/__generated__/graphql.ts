/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AppAgreement = {
  __typename?: 'AppAgreement';
  marketingPermission: Scalars['Boolean']['output'];
};

export type AppAgreementInputType = {
  marketingPermission: Scalars['Boolean']['input'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  _id: Scalars['String']['output'];
  accessToken: Scalars['String']['output'];
};

export enum CategoryType {
  Defi = 'DEFI',
  Layer1 = 'LAYER1',
  Layer2 = 'LAYER2',
  Nft = 'NFT'
}

export enum ChainType {
  Aptos = 'APTOS',
  Arb = 'ARB',
  Bnb = 'BNB',
  BnbTestnet = 'BnbTestnet',
  Evm = 'EVM',
  Matic = 'MATIC',
  MaticMumbai = 'MATIC_MUMBAI',
  Stacks = 'STACKS',
  Sui = 'SUI'
}

export enum ContentEncodingType {
  Base64 = 'BASE64',
  None = 'NONE'
}

export enum ContentFormatType {
  Html = 'HTML',
  Markdown = 'MARKDOWN',
  Text = 'TEXT'
}

export type ContentMetadata = {
  __typename?: 'ContentMetadata';
  content: Scalars['String']['output'];
  contentEncodingType: ContentEncodingType;
  contentFormatType: ContentFormatType;
};

export type ContentMetadataInputType = {
  content: Scalars['String']['input'];
  contentEncodingType?: InputMaybe<ContentEncodingType>;
  contentFormatType?: InputMaybe<ContentFormatType>;
};

export type CreateLinkInput = {
  attributes: Array<LinkAttributeInput>;
  eventId: Scalars['String']['input'];
  href: Scalars['String']['input'];
};

export type DataInputType = {
  _id?: InputMaybe<Scalars['String']['input']>;
  createdUser?: InputMaybe<UserInputType>;
  ownerQuest?: InputMaybe<QuestInputType>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  values?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Discord = {
  __typename?: 'Discord';
  accent_color?: Maybe<Scalars['Float']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  avatar_decoration?: Maybe<Scalars['String']['output']>;
  banner?: Maybe<Scalars['Float']['output']>;
  discriminator?: Maybe<Scalars['String']['output']>;
  flags?: Maybe<Scalars['Float']['output']>;
  global_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  locale?: Maybe<Scalars['String']['output']>;
  mfa_enabled?: Maybe<Scalars['Boolean']['output']>;
  premium_type?: Maybe<Scalars['Float']['output']>;
  public_flags?: Maybe<Scalars['Float']['output']>;
  username: Scalars['String']['output'];
};

export type DiscordInputType = {
  accent_color?: InputMaybe<Scalars['Float']['input']>;
  avatar?: InputMaybe<Scalars['String']['input']>;
  avatar_decoration?: InputMaybe<Scalars['String']['input']>;
  banner?: InputMaybe<Scalars['Float']['input']>;
  discriminator?: InputMaybe<Scalars['String']['input']>;
  flags?: InputMaybe<Scalars['Float']['input']>;
  global_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  mfa_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  premium_type?: InputMaybe<Scalars['Float']['input']>;
  public_flags?: InputMaybe<Scalars['Float']['input']>;
  username: Scalars['String']['input'];
};

export enum ErrorCodes {
  Duplicated = 'Duplicated',
  Unauthorized = 'Unauthorized'
}

export type EventFormat = {
  event_type: Scalars['String']['input'];
  filters?: InputMaybe<Array<EventFormatFilter>>;
  group_by?: InputMaybe<Array<EventFormatGroupBy>>;
};

export type EventFormatFilter = {
  subprop_key: Scalars['String']['input'];
  subprop_op: Scalars['String']['input'];
  subprop_type: Scalars['String']['input'];
  subprop_value: Array<Scalars['String']['input']>;
};

export type EventFormatGroupBy = {
  type: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export enum EventType {
  Main = 'MAIN',
  Recommended = 'RECOMMENDED'
}

export type HandledError = {
  __typename?: 'HandledError';
  code: ErrorCodes;
  reason?: Maybe<Scalars['String']['output']>;
};

export type IntegrationEmailQuest = {
  __typename?: 'IntegrationEmailQuest';
  _id: Scalars['String']['output'];
  completedUsers: Array<User>;
  createdAt: Scalars['DateTime']['output'];
  ownerTicketId: Scalars['String']['output'];
  questPolicy: QuestPolicy;
  title_v2: ContentMetadata;
  updatedAt: Scalars['DateTime']['output'];
};

export type IsCompletedQuestByUserIdResponse = {
  __typename?: 'IsCompletedQuestByUserIdResponse';
  isCompleted: Scalars['Boolean']['output'];
  questId: Scalars['String']['output'];
};

export type Kakao = {
  __typename?: 'Kakao';
  connected_at: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  kakao_account?: Maybe<KakaoAccount>;
  properties?: Maybe<KakaoProperties>;
};

export type KakaoAccount = {
  __typename?: 'KakaoAccount';
  age_range?: Maybe<Scalars['String']['output']>;
  age_range_needs_agreement?: Maybe<Scalars['Boolean']['output']>;
  birthday?: Maybe<Scalars['String']['output']>;
  birthday_needs_agreement?: Maybe<Scalars['Boolean']['output']>;
  birthday_type?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  gender_needs_agreement?: Maybe<Scalars['Boolean']['output']>;
  has_age_range?: Maybe<Scalars['Boolean']['output']>;
  has_birthday?: Maybe<Scalars['Boolean']['output']>;
  has_gender?: Maybe<Scalars['Boolean']['output']>;
  profile_image_needs_agreement?: Maybe<Scalars['Boolean']['output']>;
  profile_nickname_needs_agreement?: Maybe<Scalars['Boolean']['output']>;
};

export type KakaoAccountInputType = {
  age_range?: InputMaybe<Scalars['String']['input']>;
  age_range_needs_agreement?: InputMaybe<Scalars['Boolean']['input']>;
  birthday?: InputMaybe<Scalars['String']['input']>;
  birthday_needs_agreement?: InputMaybe<Scalars['Boolean']['input']>;
  birthday_type?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  gender_needs_agreement?: InputMaybe<Scalars['Boolean']['input']>;
  has_age_range?: InputMaybe<Scalars['Boolean']['input']>;
  has_birthday?: InputMaybe<Scalars['Boolean']['input']>;
  has_gender?: InputMaybe<Scalars['Boolean']['input']>;
  profile_image_needs_agreement?: InputMaybe<Scalars['Boolean']['input']>;
  profile_nickname_needs_agreement?: InputMaybe<Scalars['Boolean']['input']>;
};

export type KakaoInputType = {
  connected_at: Scalars['String']['input'];
  id: Scalars['Float']['input'];
  kakao_account?: InputMaybe<KakaoAccountInputType>;
  properties?: InputMaybe<KakaoPropertiesInputType>;
};

export type KakaoProperties = {
  __typename?: 'KakaoProperties';
  nickname: Scalars['String']['output'];
  profile_image: Scalars['String']['output'];
  thumbnail_image: Scalars['String']['output'];
};

export type KakaoPropertiesInputType = {
  nickname: Scalars['String']['input'];
  profile_image: Scalars['String']['input'];
  thumbnail_image: Scalars['String']['input'];
};

export type Link = {
  __typename?: 'Link';
  _id?: Maybe<Scalars['String']['output']>;
  attributes: Array<LinkAttribute>;
  event: Ticket;
  href: Scalars['String']['output'];
};

export type LinkAttribute = {
  __typename?: 'LinkAttribute';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type LinkAttributeInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  checkAndUpdateWinner: Ticket;
  claimReward: Scalars['Boolean']['output'];
  clearParticipatedAllEvents: Scalars['Boolean']['output'];
  clearParticipatedAllEventsByUserId: Scalars['Boolean']['output'];
  completeIntegrationEmailQuest: Scalars['Boolean']['output'];
  completeQuestOfUser: Quest;
  createIntegrationEmailQuest: IntegrationEmailQuest;
  createLink: Link;
  createProject: Project;
  createQuest: Quest;
  createTicket: Ticket;
  createUserByEmail: User;
  createUserByGmail: User;
  createUserByKakao: User;
  createUserByWallet: User;
  deleteDiscordByName: User;
  deleteKakaoByName: User;
  deleteQuest: Scalars['Boolean']['output'];
  deleteTicketById: Scalars['Boolean']['output'];
  getNonce: Scalars['String']['output'];
  participateTicketOfUser: Ticket;
  removeProject: Project;
  removeTicketById: Scalars['Boolean']['output'];
  removeUserByName: User;
  reorderProject: Scalars['Boolean']['output'];
  sendAuthCode: Scalars['Boolean']['output'];
  signInByAptosSignature: AuthResponse;
  signInByEmail: AuthResponse;
  signInBySignature: AuthResponse;
  signInByStacksSignature: AuthResponse;
  updateEventToHighestPriority: Ticket;
  updateEventTypes: Scalars['Boolean']['output'];
  updateKakaoByName: User;
  updatePasswordByEmail: Scalars['Boolean']['output'];
  updateProject: Project;
  updateQuest: Quest;
  updateTicketById: Ticket;
  updateUser: User;
  updateUserByName: User;
  updateUserEmailByAuthCode: UpdateUserEmailByAuthCodeResult;
  verify3ridgePoint: Quest;
  verifyAptosQuest: Quest;
  verifyDiscordQuest: Quest;
  verifyOnChainQuest: Quest;
  verifyScreenShotQuest: Quest;
  verifySurveyQuest: Quest;
  verifyTelegramQuest: Quest;
  verifyTwitterFollowQuest: Quest;
  verifyTwitterLikingQuest: Quest;
  verifyTwitterLinkingAndRetweetQuest: Quest;
  verifyTwitterRetweetQuest: Quest;
};


export type MutationCheckAndUpdateWinnerArgs = {
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationClaimRewardArgs = {
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationClearParticipatedAllEventsByUserIdArgs = {
  userId: Scalars['String']['input'];
};


export type MutationCompleteIntegrationEmailQuestArgs = {
  eventId: Scalars['String']['input'];
};


export type MutationCompleteQuestOfUserArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationCreateIntegrationEmailQuestArgs = {
  ownerTicketId: Scalars['String']['input'];
  title_v2: ContentMetadataInputType;
};


export type MutationCreateLinkArgs = {
  input: CreateLinkInput;
};


export type MutationCreateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  priority?: InputMaybe<Scalars['Float']['input']>;
  projectSocial?: InputMaybe<ProjectSocialInputType>;
};


export type MutationCreateQuestArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  ticketId: Scalars['String']['input'];
  title_v2?: InputMaybe<ContentMetadataInputType>;
};


export type MutationCreateTicketArgs = {
  beginTime?: InputMaybe<Scalars['DateTime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_v2?: InputMaybe<ContentMetadataInputType>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  project?: InputMaybe<Scalars['String']['input']>;
  quests?: InputMaybe<Array<QuestCreateInput>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  untilTime?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationCreateUserByEmailArgs = {
  authCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationCreateUserByGmailArgs = {
  gmail: Scalars['String']['input'];
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserByKakaoArgs = {
  kakaoInfo: KakaoInputType;
};


export type MutationCreateUserByWalletArgs = {
  address: Scalars['String']['input'];
  chain: ChainType;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type MutationDeleteDiscordByNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteKakaoByNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationDeleteQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
};


export type MutationDeleteTicketByIdArgs = {
  ticketId: Scalars['String']['input'];
};


export type MutationGetNonceArgs = {
  walletAddress: Scalars['String']['input'];
};


export type MutationParticipateTicketOfUserArgs = {
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationRemoveProjectArgs = {
  projectId: Scalars['String']['input'];
};


export type MutationRemoveTicketByIdArgs = {
  ticketId: Scalars['String']['input'];
};


export type MutationRemoveUserByNameArgs = {
  name: Scalars['String']['input'];
};


export type MutationReorderProjectArgs = {
  projectId: Scalars['String']['input'];
  to: Scalars['Float']['input'];
};


export type MutationSendAuthCodeArgs = {
  to: Scalars['String']['input'];
};


export type MutationSignInByAptosSignatureArgs = {
  publicKey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  wallet: UserWalletInputType;
};


export type MutationSignInByEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSignInBySignatureArgs = {
  signature: Scalars['String']['input'];
  wallet: UserWalletInputType;
};


export type MutationSignInByStacksSignatureArgs = {
  publicKey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
  wallet: UserWalletInputType;
};


export type MutationUpdateEventToHighestPriorityArgs = {
  eventId: Scalars['String']['input'];
};


export type MutationUpdateEventTypesArgs = {
  eventId: Scalars['String']['input'];
  eventTypes: Array<EventType>;
};


export type MutationUpdateKakaoByNameArgs = {
  kakaoInfo: KakaoInputType;
  name: Scalars['String']['input'];
};


export type MutationUpdatePasswordByEmailArgs = {
  authCode: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateProjectArgs = {
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  projectId: Scalars['String']['input'];
  projectSocial?: InputMaybe<ProjectSocialInputType>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};


export type MutationUpdateQuestArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  title_v2?: InputMaybe<ContentMetadataInputType>;
};


export type MutationUpdateTicketByIdArgs = {
  beginTime?: InputMaybe<Scalars['DateTime']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_v2?: InputMaybe<ContentMetadataInputType>;
  eventTypes?: InputMaybe<Array<EventType>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  participants?: InputMaybe<Array<UserInputType>>;
  project?: InputMaybe<Scalars['String']['input']>;
  quests?: InputMaybe<Array<QuestCreateInput>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  ticketId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  untilTime?: InputMaybe<Scalars['DateTime']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
  winners?: InputMaybe<Array<UserInputType>>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  input: UserUpdateInput;
};


export type MutationUpdateUserByNameArgs = {
  name: Scalars['String']['input'];
  userUpdateInput: UserUpdateInput;
};


export type MutationUpdateUserEmailByAuthCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationVerify3ridgePointArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyAptosQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyDiscordQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyOnChainQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyScreenShotQuestArgs = {
  picUris: Array<Scalars['String']['input']>;
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifySurveyQuestArgs = {
  questId: Scalars['String']['input'];
  surveyContents: Array<Scalars['String']['input']>;
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyTelegramQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyTwitterFollowQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyTwitterLikingQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyTwitterLinkingAndRetweetQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationVerifyTwitterRetweetQuestArgs = {
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type Project = {
  __typename?: 'Project';
  _id?: Maybe<Scalars['String']['output']>;
  categories?: Maybe<Array<CategoryType>>;
  description?: Maybe<Scalars['String']['output']>;
  eventTypes?: Maybe<Array<EventType>>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  managedUsers?: Maybe<Array<User>>;
  name: Scalars['String']['output'];
  priority?: Maybe<Scalars['Float']['output']>;
  projectSocial?: Maybe<ProjectSocial>;
  tickets?: Maybe<Array<Ticket>>;
};

export type ProjectInputType = {
  _id?: InputMaybe<Scalars['String']['input']>;
  categories?: InputMaybe<Array<CategoryType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  eventTypes?: InputMaybe<Array<EventType>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  managedUsers?: InputMaybe<Array<UserInputType>>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  projectSocial?: InputMaybe<ProjectSocialInputType>;
  tickets?: InputMaybe<Array<TicketInputType>>;
};

export type ProjectSocial = {
  __typename?: 'ProjectSocial';
  discordUrl?: Maybe<Scalars['String']['output']>;
  kakaoUrl?: Maybe<Scalars['String']['output']>;
  mediumUrl?: Maybe<Scalars['String']['output']>;
  naverBlogUrl?: Maybe<Scalars['String']['output']>;
  officialUrl?: Maybe<Scalars['String']['output']>;
  telegramUrl?: Maybe<Scalars['String']['output']>;
  twitterUrl?: Maybe<Scalars['String']['output']>;
};

export type ProjectSocialInputType = {
  discordUrl?: InputMaybe<Scalars['String']['input']>;
  kakaoUrl?: InputMaybe<Scalars['String']['input']>;
  mediumUrl?: InputMaybe<Scalars['String']['input']>;
  naverBlogUrl?: InputMaybe<Scalars['String']['input']>;
  officialUrl?: InputMaybe<Scalars['String']['input']>;
  telegramUrl?: InputMaybe<Scalars['String']['input']>;
  twitterUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  auth: AuthResponse;
  availableTickets: Array<Ticket>;
  completedTickets: Array<Ticket>;
  findMissedTickets: Array<Ticket>;
  findQuestById: Quest;
  findRankByUserId: Scalars['Float']['output'];
  getWalletAddressOfWinner: Array<Scalars['String']['output']>;
  hasToAddressTransactionForAddress: Scalars['Boolean']['output'];
  isCompletedQuestByUserId: IsCompletedQuestByUserIdResponse;
  isCompletedTicket: Scalars['Boolean']['output'];
  isFollowTwitterByUserId: User;
  isLikingTweetByUserId: User;
  isNeedEmailAccountMigration: Scalars['Boolean']['output'];
  isRegisteredWallet: Scalars['Boolean']['output'];
  isRetweetedTwitterByUserId: User;
  isUserInDiscordServer: Scalars['Boolean']['output'];
  isUserInTelegramGroup: Scalars['Boolean']['output'];
  links: Array<Link>;
  projectById: Project;
  projectByName: Array<Project>;
  projects: Array<Project>;
  quests: Array<Quest>;
  segmentation: Segmentation;
  ticketById: Ticket;
  tickets: Array<Ticket>;
  ticketsByProjectId: Array<Ticket>;
  userByAccessToken: User;
  userByEmail?: Maybe<User>;
  userByGmail: User;
  userByKakaoId: User;
  userByName: User;
  userByWalletAddress: User;
  users: Array<User>;
  usersOrderByRewardPointDesc: Array<User>;
  validateAuthCode: Scalars['Boolean']['output'];
};


export type QueryAuthArgs = {
  userId: Scalars['String']['input'];
};


export type QueryFindQuestByIdArgs = {
  questId: Scalars['String']['input'];
};


export type QueryFindRankByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetWalletAddressOfWinnerArgs = {
  chainType: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
};


export type QueryHasToAddressTransactionForAddressArgs = {
  chain: Scalars['String']['input'];
  fromAddress: Scalars['String']['input'];
  toAddresses?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryIsCompletedQuestByUserIdArgs = {
  questId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsCompletedTicketArgs = {
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsFollowTwitterByUserIdArgs = {
  targetTwitterUsername: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsLikingTweetByUserIdArgs = {
  targetTweetId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsNeedEmailAccountMigrationArgs = {
  email: Scalars['String']['input'];
};


export type QueryIsRegisteredWalletArgs = {
  address: Scalars['String']['input'];
  chain: ChainType;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
};


export type QueryIsRetweetedTwitterByUserIdArgs = {
  targetTweetId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsUserInDiscordServerArgs = {
  channelId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type QueryIsUserInTelegramGroupArgs = {
  groupId: Scalars['Float']['input'];
  userId: Scalars['String']['input'];
};


export type QueryProjectByIdArgs = {
  projectId: Scalars['String']['input'];
};


export type QueryProjectByNameArgs = {
  projectName: Scalars['String']['input'];
};


export type QueryProjectsArgs = {
  eventTypes?: InputMaybe<Array<EventType>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryQuestsArgs = {
  eventId: Scalars['String']['input'];
};


export type QuerySegmentationArgs = {
  e: EventFormat;
  end: Scalars['String']['input'];
  start: Scalars['String']['input'];
};


export type QueryTicketByIdArgs = {
  ticketId: Scalars['String']['input'];
};


export type QueryTicketsArgs = {
  eventTypes?: InputMaybe<Array<EventType>>;
  isVisibleOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
};


export type QueryTicketsByProjectIdArgs = {
  eventTypes?: InputMaybe<Array<EventType>>;
  isVisibleOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['String']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryUserByGmailArgs = {
  gmail: Scalars['String']['input'];
};


export type QueryUserByKakaoIdArgs = {
  kakaoId: Scalars['Float']['input'];
};


export type QueryUserByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryUserByWalletAddressArgs = {
  walletAddress: Scalars['String']['input'];
};


export type QueryUsersOrderByRewardPointDescArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryValidateAuthCodeArgs = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type Quest = {
  __typename?: 'Quest';
  _id: Scalars['String']['output'];
  completedUsers: Array<User>;
  dataCollection?: Maybe<Array<QuestData>>;
  description: Scalars['String']['output'];
  ownerTicketId: Scalars['String']['output'];
  questGuides?: Maybe<Array<ContentMetadata>>;
  questPolicy?: Maybe<QuestPolicy>;
  title?: Maybe<Scalars['String']['output']>;
  title_v2: ContentMetadata;
};

export type QuestCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  ticketId: Scalars['String']['input'];
  title_v2?: InputMaybe<ContentMetadataInputType>;
};

export type QuestData = {
  __typename?: 'QuestData';
  _id?: Maybe<Scalars['String']['output']>;
  createdUser?: Maybe<User>;
  ownerQuest?: Maybe<Quest>;
  tags?: Maybe<Array<Scalars['String']['output']>>;
  values?: Maybe<Array<Scalars['String']['output']>>;
};

export type QuestInputType = {
  _id?: InputMaybe<Scalars['String']['input']>;
  completedUsers?: InputMaybe<Array<UserInputType>>;
  dataCollection?: InputMaybe<Array<DataInputType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  ownerTicketId?: InputMaybe<Scalars['String']['input']>;
  questGuides?: InputMaybe<Array<ContentMetadataInputType>>;
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_v2?: InputMaybe<ContentMetadataInputType>;
};

export type QuestPolicy = {
  __typename?: 'QuestPolicy';
  context?: Maybe<Scalars['String']['output']>;
  questPolicy: QuestPolicyType;
  rewardPoint?: Maybe<Scalars['Float']['output']>;
};

export type QuestPolicyInputType = {
  context?: InputMaybe<Scalars['String']['input']>;
  questPolicy: QuestPolicyType;
  rewardPoint?: InputMaybe<Scalars['Float']['input']>;
};

export enum QuestPolicyType {
  Quiz = 'QUIZ',
  Verify_3RidgePoint = 'VERIFY_3RIDGE_POINT',
  VerifyAgreement = 'VERIFY_AGREEMENT',
  VerifyAptosBridgeToAptos = 'VERIFY_APTOS_BRIDGE_TO_APTOS',
  VerifyAptosExistTx = 'VERIFY_APTOS_EXIST_TX',
  VerifyAptosHasAns = 'VERIFY_APTOS_HAS_ANS',
  VerifyAptosHasNft = 'VERIFY_APTOS_HAS_NFT',
  VerifyDiscord = 'VERIFY_DISCORD',
  VerifyEmail = 'VERIFY_EMAIL',
  VerifyHasDiscord = 'VERIFY_HAS_DISCORD',
  VerifyHasEmail = 'VERIFY_HAS_EMAIL',
  VerifyHasTelegram = 'VERIFY_HAS_TELEGRAM',
  VerifyHasTwitter = 'VERIFY_HAS_TWITTER',
  VerifyHasWalletAddress = 'VERIFY_HAS_WALLET_ADDRESS',
  VerifyOnChain = 'VERIFY_ON_CHAIN',
  VerifyScreenshot = 'VERIFY_SCREENSHOT',
  VerifySurvey = 'VERIFY_SURVEY',
  VerifyTelegram = 'VERIFY_TELEGRAM',
  VerifyTwitterFollow = 'VERIFY_TWITTER_FOLLOW',
  VerifyTwitterLiking = 'VERIFY_TWITTER_LIKING',
  VerifyTwitterLinkingRetweet = 'VERIFY_TWITTER_LINKING_RETWEET',
  VerifyTwitterRetweet = 'VERIFY_TWITTER_RETWEET',
  VerifyVisitWebsite = 'VERIFY_VISIT_WEBSITE',
  VerifyWalletAddress = 'VERIFY_WALLET_ADDRESS'
}

export type RewardPolicy = {
  __typename?: 'RewardPolicy';
  context: Scalars['String']['output'];
  rewardPoint: Scalars['Float']['output'];
  rewardPolicyType: RewardPolicyType;
};

export type RewardPolicyInputType = {
  context: Scalars['String']['input'];
  rewardPoint: Scalars['Float']['input'];
  rewardPolicyType: RewardPolicyType;
};

export enum RewardPolicyType {
  Always = 'ALWAYS',
  Fcfs = 'FCFS',
  LuckyDraw = 'LUCKY_DRAW'
}

export type Segmentation = {
  __typename?: 'Segmentation';
  series: Array<Array<Scalars['Float']['output']>>;
  seriesCollapsed: Array<Array<SeriesCollapsed>>;
  seriesLabels: Array<Array<SeriesLabelsUnion>>;
  xValues: Array<Scalars['String']['output']>;
};

export type SeriesCollapsed = {
  __typename?: 'SeriesCollapsed';
  setId: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SeriesLabelNumber = {
  __typename?: 'SeriesLabelNumber';
  value: Scalars['Float']['output'];
};

export type SeriesLabelString = {
  __typename?: 'SeriesLabelString';
  value: Scalars['String']['output'];
};

export type SeriesLabelsUnion = SeriesLabelNumber | SeriesLabelString;

export type TelegramUser = {
  __typename?: 'TelegramUser';
  authDate?: Maybe<Scalars['Float']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  photoUrl?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type TelegramUserInputType = {
  authDate?: InputMaybe<Scalars['Float']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  hash?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

export type Ticket = {
  __typename?: 'Ticket';
  _id?: Maybe<Scalars['String']['output']>;
  beginTime?: Maybe<Scalars['DateTime']['output']>;
  completed?: Maybe<Scalars['Boolean']['output']>;
  completedUsers?: Maybe<Array<User>>;
  description?: Maybe<Scalars['String']['output']>;
  description_v2?: Maybe<ContentMetadata>;
  eventTypes: Array<EventType>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  participantCount?: Maybe<Scalars['Float']['output']>;
  participants?: Maybe<Array<User>>;
  pointUpdateType?: Maybe<Scalars['String']['output']>;
  priority?: Maybe<Scalars['Float']['output']>;
  project?: Maybe<Project>;
  quests?: Maybe<Array<Quest>>;
  rewardClaimedUsers?: Maybe<Array<User>>;
  rewardPolicy?: Maybe<RewardPolicy>;
  shortDescription?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  untilTime?: Maybe<Scalars['DateTime']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
  winners?: Maybe<Array<User>>;
};

export type TicketInputType = {
  _id?: InputMaybe<Scalars['String']['input']>;
  beginTime?: InputMaybe<Scalars['DateTime']['input']>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  completedUsers?: InputMaybe<Array<UserInputType>>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_v2?: InputMaybe<ContentMetadataInputType>;
  eventTypes?: InputMaybe<Array<EventType>>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  participantCount?: InputMaybe<Scalars['Float']['input']>;
  participants?: InputMaybe<Array<UserInputType>>;
  pointUpdateType?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  project?: InputMaybe<ProjectInputType>;
  quests?: InputMaybe<Array<QuestInputType>>;
  rewardClaimedUsers?: InputMaybe<Array<UserInputType>>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
  shortDescription?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  untilTime?: InputMaybe<Scalars['DateTime']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
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

export type UpdateUserEmailByAuthCodeResult = HandledError | User;

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['String']['output']>;
  appAgreement?: Maybe<AppAgreement>;
  discord?: Maybe<Discord>;
  email?: Maybe<Scalars['String']['output']>;
  gmail?: Maybe<Scalars['String']['output']>;
  kakao?: Maybe<Kakao>;
  managedProjects?: Maybe<Array<Project>>;
  name?: Maybe<Scalars['String']['output']>;
  participatingTickets?: Maybe<Array<Ticket>>;
  profileImageUrl?: Maybe<Scalars['String']['output']>;
  rewardPoint?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  userSocial?: Maybe<UserSocial>;
  wallets?: Maybe<Array<UserWallet>>;
};

export type UserInputType = {
  _id?: InputMaybe<Scalars['String']['input']>;
  appAgreement?: InputMaybe<AppAgreementInputType>;
  discord?: InputMaybe<DiscordInputType>;
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  kakao?: InputMaybe<KakaoInputType>;
  managedProjects?: InputMaybe<Array<ProjectInputType>>;
  name?: InputMaybe<Scalars['String']['input']>;
  participatingTickets?: InputMaybe<Array<TicketInputType>>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  rewardPoint?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userSocial?: InputMaybe<UserSocialInputType>;
  wallets?: InputMaybe<Array<UserWalletInputType>>;
};

export type UserSocial = {
  __typename?: 'UserSocial';
  telegramUser?: Maybe<TelegramUser>;
  twitterId?: Maybe<Scalars['String']['output']>;
};

export type UserSocialInputType = {
  telegramUser?: InputMaybe<TelegramUserInputType>;
  twitterId?: InputMaybe<Scalars['String']['input']>;
};

export type UserUpdateInput = {
  appAgreement?: InputMaybe<AppAgreementInputType>;
  discord?: InputMaybe<DiscordInputType>;
  email?: InputMaybe<Scalars['String']['input']>;
  gmail?: InputMaybe<Scalars['String']['input']>;
  profileImageUrl?: InputMaybe<Scalars['String']['input']>;
  rewardPoint?: InputMaybe<Scalars['Float']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  userSocial?: InputMaybe<UserSocialInputType>;
  wallets?: InputMaybe<Array<UserWalletInputType>>;
};

export type UserWallet = {
  __typename?: 'UserWallet';
  address: Scalars['String']['output'];
  chain: ChainType;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
};

export type UserWalletInputType = {
  address: Scalars['String']['input'];
  chain: ChainType;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id?: string | null, title?: string | null, imageUrl?: string | null }> };

export type CreateLinkMutationVariables = Exact<{
  input: CreateLinkInput;
}>;


export type CreateLinkMutation = { __typename?: 'Mutation', createLink: { __typename?: 'Link', _id?: string | null } };

export type LinksQueryVariables = Exact<{ [key: string]: never; }>;


export type LinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'Link', _id?: string | null, href: string, attributes: Array<{ __typename?: 'LinkAttribute', key: string, value: string }>, event: { __typename?: 'Ticket', _id?: string | null, title?: string | null, imageUrl?: string | null } }> };

export type CreateUserByEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  authCode: Scalars['String']['input'];
}>;


export type CreateUserByEmailMutation = { __typename?: 'Mutation', createUserByEmail: { __typename?: 'User', _id?: string | null } };

export type UpdateUserMutationMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UserUpdateInput;
}>;


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id?: string | null } };

export type UpdateUserEmailByAuthCodeMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type UpdateUserEmailByAuthCodeMutation = { __typename?: 'Mutation', updateUserEmailByAuthCode: { __typename: 'HandledError', code: ErrorCodes, reason?: string | null } | { __typename: 'User', email?: string | null } };

export type UpdateEventToHighestPriorityMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type UpdateEventToHighestPriorityMutation = { __typename?: 'Mutation', updateEventToHighestPriority: { __typename?: 'Ticket', _id?: string | null, priority?: number | null } };

export type UpdateEventTypesMutationVariables = Exact<{
  eventId: Scalars['String']['input'];
  eventTypes: Array<EventType> | EventType;
}>;


export type UpdateEventTypesMutation = { __typename?: 'Mutation', updateEventTypes: boolean };

export type UserItemFragment = { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, type?: string | null, rewardPoint?: number | null } & { ' $fragmentName'?: 'UserItemFragment' };

export type GetUserByAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserByAccessTokenQuery = { __typename?: 'Query', userByAccessToken: (
    { __typename?: 'User', wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null, participatingTickets?: Array<{ __typename?: 'Ticket', _id?: string | null, imageUrl?: string | null, description?: string | null, title?: string | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string }> | null }> | null }
    & { ' $fragmentRefs'?: { 'UserItemFragment': UserItemFragment } }
  ) };

export type SignInByEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type SignInByEmailMutation = { __typename?: 'Mutation', signInByEmail: { __typename?: 'AuthResponse', _id: string, accessToken: string } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserItemFragment': UserItemFragment } }
  )> };

export type GetNonceMutationVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type GetNonceMutation = { __typename?: 'Mutation', getNonce: string };

export type SignInBySignatureMutationVariables = Exact<{
  wallet: UserWalletInputType;
  signature: Scalars['String']['input'];
}>;


export type SignInBySignatureMutation = { __typename?: 'Mutation', signInBySignature: { __typename?: 'AuthResponse', _id: string, accessToken: string } };

export type SignInByAptosSignatureMutationVariables = Exact<{
  wallet: UserWalletInputType;
  publicKey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}>;


export type SignInByAptosSignatureMutation = { __typename?: 'Mutation', signInByAptosSignature: { __typename?: 'AuthResponse', _id: string, accessToken: string } };

export type SignInByStacksSignatureMutationVariables = Exact<{
  wallet: UserWalletInputType;
  publicKey: Scalars['String']['input'];
  signature: Scalars['String']['input'];
}>;


export type SignInByStacksSignatureMutation = { __typename?: 'Mutation', signInByStacksSignature: { __typename?: 'AuthResponse', _id: string, accessToken: string } };

export type GetUsersOrderByRewardPointDescQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUsersOrderByRewardPointDescQuery = { __typename?: 'Query', usersOrderByRewardPointDesc: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null }> };

export type FindRankByUserIdQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type FindRankByUserIdQuery = { __typename?: 'Query', findRankByUserId: number };

export type GetUserByKakaoIdQueryVariables = Exact<{
  kakaoId: Scalars['Float']['input'];
}>;


export type GetUserByKakaoIdQuery = { __typename?: 'Query', userByKakaoId: { __typename?: 'User', _id?: string | null, email?: string | null, gmail?: string | null, name?: string | null, profileImageUrl?: string | null, rewardPoint?: number | null, participatingTickets?: Array<{ __typename?: 'Ticket', _id?: string | null, imageUrl?: string | null, description?: string | null, title?: string | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string }> | null }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } };

export type GetUserByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type GetUserByNameQuery = { __typename?: 'Query', userByName: { __typename?: 'User', _id?: string | null, email?: string | null, gmail?: string | null, name?: string | null, profileImageUrl?: string | null, rewardPoint?: number | null, participatingTickets?: Array<{ __typename?: 'Ticket', _id?: string | null, imageUrl?: string | null, description?: string | null, title?: string | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string }> | null }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } | null };

export type UserByGmailQueryVariables = Exact<{
  gmail: Scalars['String']['input'];
}>;


export type UserByGmailQuery = { __typename?: 'Query', userByGmail: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, gmail?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } };

export type GetUserByWalletAddressQueryVariables = Exact<{
  walletAddress: Scalars['String']['input'];
}>;


export type GetUserByWalletAddressQuery = { __typename?: 'Query', userByWalletAddress: { __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null, email?: string | null, rewardPoint?: number | null, wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null, userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null, kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null } | null, discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } };

export type ValidateAuthCodeQueryVariables = Exact<{
  email: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type ValidateAuthCodeQuery = { __typename?: 'Query', validateAuthCode: boolean };

export type SendAuthCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendAuthCodeMutation = { __typename?: 'Mutation', sendAuthCode: boolean };

export type IsNeedEmailAccountMigrationQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type IsNeedEmailAccountMigrationQuery = { __typename?: 'Query', isNeedEmailAccountMigration: boolean };

export type UpdatePasswordByEmailMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  authCode: Scalars['String']['input'];
}>;


export type UpdatePasswordByEmailMutation = { __typename?: 'Mutation', updatePasswordByEmail: boolean };

export type CreateUserByGmailMutationVariables = Exact<{
  gmail: Scalars['String']['input'];
  profileImageUrl: Scalars['String']['input'];
}>;


export type CreateUserByGmailMutation = { __typename?: 'Mutation', createUserByGmail: { __typename?: 'User', name?: string | null } };

export type CreateUserByWalletMutationVariables = Exact<{
  address: Scalars['String']['input'];
  chain: ChainType;
}>;


export type CreateUserByWalletMutation = { __typename?: 'Mutation', createUserByWallet: { __typename?: 'User', name?: string | null } };

export type CreateUserByKakaoMutationVariables = Exact<{
  kakaoInfo: KakaoInputType;
}>;


export type CreateUserByKakaoMutation = { __typename?: 'Mutation', createUserByKakao: { __typename?: 'User', name?: string | null } };

export type UpdateUserWalletByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  wallets?: InputMaybe<Array<UserWalletInputType> | UserWalletInputType>;
}>;


export type UpdateUserWalletByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', wallets?: Array<{ __typename?: 'UserWallet', address: string, chain: ChainType }> | null } };

export type UpdateUserProfileImageByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  profileImageUrl: Scalars['String']['input'];
}>;


export type UpdateUserProfileImageByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', profileImageUrl?: string | null } };

export type UpdateUserAppAgreementByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  appAgreement: AppAgreementInputType;
}>;


export type UpdateUserAppAgreementByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', appAgreement?: { __typename?: 'AppAgreement', marketingPermission: boolean } | null } };

export type UpdateUserEmailByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type UpdateUserEmailByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', email?: string | null } };

export type UpdateUserRewardByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  rewardPoint: Scalars['Float']['input'];
}>;


export type UpdateUserRewardByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', rewardPoint?: number | null } };

export type UpdateUserSocialByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  userSocial: UserSocialInputType;
}>;


export type UpdateUserSocialByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', userSocial?: { __typename?: 'UserSocial', twitterId?: string | null, telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null } };

export type UpdateUserDiscordByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  discord?: InputMaybe<DiscordInputType>;
}>;


export type UpdateUserDiscordByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', discord?: { __typename?: 'Discord', accent_color?: number | null, avatar?: string | null, avatar_decoration?: string | null, banner?: number | null, discriminator?: string | null, flags?: number | null, global_name?: string | null, id: string, locale?: string | null, mfa_enabled?: boolean | null, premium_type?: number | null, public_flags?: number | null, username: string } | null } };

export type UpdateUserTwitterByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  twitterId: Scalars['String']['input'];
}>;


export type UpdateUserTwitterByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', userSocial?: { __typename?: 'UserSocial', twitterId?: string | null } | null } };

export type UpdateUserTelegramByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  telegramUser: TelegramUserInputType;
}>;


export type UpdateUserTelegramByNameMutation = { __typename?: 'Mutation', updateUserByName: { __typename?: 'User', userSocial?: { __typename?: 'UserSocial', telegramUser?: { __typename?: 'TelegramUser', authDate?: number | null, firstName?: string | null, hash?: string | null, id: number, photoUrl?: string | null, username: string } | null } | null } };

export type UpdateKakaoByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
  kakaoInfo: KakaoInputType;
}>;


export type UpdateKakaoByNameMutation = { __typename?: 'Mutation', updateKakaoByName: { __typename?: 'User', kakao?: { __typename?: 'Kakao', id: number, connected_at: string, properties?: { __typename?: 'KakaoProperties', nickname: string, profile_image: string, thumbnail_image: string } | null, kakao_account?: { __typename?: 'KakaoAccount', age_range?: string | null, age_range_needs_agreement?: boolean | null, birthday?: string | null, birthday_needs_agreement?: boolean | null, birthday_type?: string | null, gender?: string | null, gender_needs_agreement?: boolean | null, has_age_range?: boolean | null, has_birthday?: boolean | null, has_gender?: boolean | null, profile_image_needs_agreement?: boolean | null, profile_nickname_needs_agreement?: boolean | null } | null } | null } };

export type DeleteKakaoByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DeleteKakaoByNameMutation = { __typename?: 'Mutation', deleteKakaoByName: { __typename?: 'User', _id?: string | null } };

export type DeleteDiscordByNameMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type DeleteDiscordByNameMutation = { __typename?: 'Mutation', deleteDiscordByName: { __typename?: 'User', _id?: string | null } };

export type TicketsQueryVariables = Exact<{
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
  eventTypes?: InputMaybe<Array<EventType> | EventType>;
  isVisibleOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id?: string | null, beginTime?: any | null, untilTime?: any | null, completed?: boolean | null, description?: string | null, shortDescription?: string | null, imageUrl?: string | null, title?: string | null, visible?: boolean | null, eventTypes: Array<EventType>, description_v2?: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string } | null, participants?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string, title?: string | null, description: string, title_v2: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string }, questPolicy?: { __typename?: 'QuestPolicy', context?: string | null, questPolicy: QuestPolicyType } | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export type GetTicketByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetTicketByIdQuery = { __typename?: 'Query', ticketById: { __typename?: 'Ticket', _id?: string | null, beginTime?: any | null, untilTime?: any | null, completed?: boolean | null, description?: string | null, shortDescription?: string | null, participantCount?: number | null, imageUrl?: string | null, title?: string | null, visible?: boolean | null, eventTypes: Array<EventType>, description_v2?: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string } | null, participants?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string, title?: string | null, description: string, title_v2: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string }, questPolicy?: { __typename?: 'QuestPolicy', context?: string | null, questPolicy: QuestPolicyType } | null, questGuides?: Array<{ __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, content: string, contentEncodingType: ContentEncodingType }> | null }> | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null, rewardClaimedUsers?: Array<{ __typename?: 'User', _id?: string | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null } | null } };

export type ProjectsQueryVariables = Exact<{
  eventTypes?: InputMaybe<Array<EventType> | EventType>;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, priority?: number | null, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null }> };

export type ProjectByIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type ProjectByIdQuery = { __typename?: 'Query', projectById: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, priority?: number | null, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null } };

export type TicketsByProjectIdQueryVariables = Exact<{
  projectId: Scalars['String']['input'];
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
  eventTypes?: InputMaybe<Array<EventType> | EventType>;
  isVisibleOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type TicketsByProjectIdQuery = { __typename?: 'Query', ticketsByProjectId: Array<{ __typename?: 'Ticket', _id?: string | null, completed?: boolean | null, description?: string | null, imageUrl?: string | null, title?: string | null, visible?: boolean | null, eventTypes: Array<EventType>, description_v2?: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string } | null, participants?: Array<{ __typename?: 'User', name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string, title?: string | null, description: string, title_v2: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string }, questPolicy?: { __typename?: 'QuestPolicy', context?: string | null, questPolicy: QuestPolicyType } | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export type VerifyTwitterLinkingAndRetweetQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyTwitterLinkingAndRetweetQuestMutation = { __typename?: 'Mutation', verifyTwitterLinkingAndRetweetQuest: { __typename?: 'Quest', _id: string } };

export type VerifyTwitterLikingQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyTwitterLikingQuestMutation = { __typename?: 'Mutation', verifyTwitterLikingQuest: { __typename?: 'Quest', _id: string } };

export type VerifyTwitterFollowQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyTwitterFollowQuestMutation = { __typename?: 'Mutation', verifyTwitterFollowQuest: { __typename?: 'Quest', _id: string } };

export type VerifyTwitterRetweetQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyTwitterRetweetQuestMutation = { __typename?: 'Mutation', verifyTwitterRetweetQuest: { __typename?: 'Quest', _id: string } };

export type Verify3ridgePointMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type Verify3ridgePointMutation = { __typename?: 'Mutation', verify3ridgePoint: { __typename?: 'Quest', _id: string } };

export type VerifyDiscordQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyDiscordQuestMutation = { __typename?: 'Mutation', verifyDiscordQuest: { __typename?: 'Quest', _id: string } };

export type IsCompletedQuestByUserIdQueryVariables = Exact<{
  questId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type IsCompletedQuestByUserIdQuery = { __typename?: 'Query', isCompletedQuestByUserId: { __typename?: 'IsCompletedQuestByUserIdResponse', isCompleted: boolean, questId: string } };

export type CompleteQuestOfUserMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type CompleteQuestOfUserMutation = { __typename?: 'Mutation', completeQuestOfUser: { __typename?: 'Quest', _id: string, title?: string | null, description: string, title_v2: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string }, questPolicy?: { __typename?: 'QuestPolicy', context?: string | null, questPolicy: QuestPolicyType } | null } };

export type ClaimRewardMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type ClaimRewardMutation = { __typename?: 'Mutation', claimReward: boolean };

export type VerifyAptosQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyAptosQuestMutation = { __typename?: 'Mutation', verifyAptosQuest: { __typename?: 'Quest', _id: string } };

export type IsRegisteredWalletQueryVariables = Exact<{
  address: Scalars['String']['input'];
  chain: ChainType;
}>;


export type IsRegisteredWalletQuery = { __typename?: 'Query', isRegisteredWallet: boolean };

export type ClearParticipatedAllEventsByUserIdMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type ClearParticipatedAllEventsByUserIdMutation = { __typename?: 'Mutation', clearParticipatedAllEventsByUserId: boolean };

export type UpdateTicketVisibleMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type UpdateTicketVisibleMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketShortDescriptionMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  shortDescription?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketShortDescriptionMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketImageUrlMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketImageUrlMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketTitleMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketTitleMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketProjectMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  project?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketProjectMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketDateRangeTimeMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  beginTime?: InputMaybe<Scalars['DateTime']['input']>;
  untilTime?: InputMaybe<Scalars['DateTime']['input']>;
}>;


export type UpdateTicketDateRangeTimeMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketDescriptionMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  description_v2?: InputMaybe<ContentMetadataInputType>;
}>;


export type UpdateTicketDescriptionMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type UpdateTicketRewardPolicyMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
}>;


export type UpdateTicketRewardPolicyMutation = { __typename?: 'Mutation', updateTicketById: { __typename?: 'Ticket', _id?: string | null } };

export type CreateQuestMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  title_v2?: InputMaybe<ContentMetadataInputType>;
  description?: InputMaybe<Scalars['String']['input']>;
  questPolicy?: InputMaybe<QuestPolicyInputType>;
}>;


export type CreateQuestMutation = { __typename?: 'Mutation', createQuest: { __typename?: 'Quest', _id: string } };

export type DeleteQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
}>;


export type DeleteQuestMutation = { __typename?: 'Mutation', deleteQuest: boolean };

export type UpdateQuestMutationVariables = Exact<{
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
  questPolicy?: InputMaybe<QuestPolicyInputType>;
  title_v2?: InputMaybe<ContentMetadataInputType>;
}>;


export type UpdateQuestMutation = { __typename?: 'Mutation', updateQuest: { __typename?: 'Quest', _id: string } };

export type CreateTicketMutationVariables = Exact<{
  beginTime?: InputMaybe<Scalars['DateTime']['input']>;
  untilTime?: InputMaybe<Scalars['DateTime']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  description_v2?: InputMaybe<ContentMetadataInputType>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  rewardPolicy?: InputMaybe<RewardPolicyInputType>;
}>;


export type CreateTicketMutation = { __typename?: 'Mutation', createTicket: { __typename?: 'Ticket', _id?: string | null } };

export type DeleteTicketMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
}>;


export type DeleteTicketMutation = { __typename?: 'Mutation', removeTicketById: boolean };

export type VerifySurveyQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  surveyContents: Array<Scalars['String']['input']> | Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifySurveyQuestMutation = { __typename?: 'Mutation', verifySurveyQuest: { __typename?: 'Quest', _id: string } };

export type VerifyScreenShotQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  picUris: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type VerifyScreenShotQuestMutation = { __typename?: 'Mutation', verifyScreenShotQuest: { __typename?: 'Quest', _id: string } };

export type RemoveProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject: { __typename?: 'Project', _id?: string | null } };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String']['input'];
  categories?: InputMaybe<Array<CategoryType> | CategoryType>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  projectSocial?: InputMaybe<ProjectSocialInputType>;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', _id?: string | null } };

export type UpdateProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  priority?: InputMaybe<Scalars['Float']['input']>;
  projectSocial?: InputMaybe<ProjectSocialInputType>;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', _id?: string | null } };

export type ReorderProjectMutationVariables = Exact<{
  projectId: Scalars['String']['input'];
  to: Scalars['Float']['input'];
}>;


export type ReorderProjectMutation = { __typename?: 'Mutation', reorderProject: boolean };

export type VerifyOnChainQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyOnChainQuestMutation = { __typename?: 'Mutation', verifyOnChainQuest: { __typename?: 'Quest', _id: string } };

export type VerifyTelegramQuestMutationVariables = Exact<{
  questId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type VerifyTelegramQuestMutation = { __typename?: 'Mutation', verifyTelegramQuest: { __typename?: 'Quest', _id: string } };

export type AllTicketsQueryVariables = Exact<{
  sort?: InputMaybe<TicketSortType>;
  status?: InputMaybe<TicketStatusType>;
  eventTypes?: InputMaybe<Array<EventType> | EventType>;
  isVisibleOnly?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AllTicketsQuery = { __typename?: 'Query', tickets: Array<{ __typename?: 'Ticket', _id?: string | null, beginTime?: any | null, untilTime?: any | null, completed?: boolean | null, description?: string | null, shortDescription?: string | null, imageUrl?: string | null, title?: string | null, visible?: boolean | null, eventTypes: Array<EventType>, description_v2?: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string } | null, participants?: Array<{ __typename?: 'User', _id?: string | null, name?: string | null, profileImageUrl?: string | null }> | null, quests?: Array<{ __typename?: 'Quest', _id: string, title?: string | null, description: string, title_v2: { __typename?: 'ContentMetadata', contentFormatType: ContentFormatType, contentEncodingType: ContentEncodingType, content: string }, questPolicy?: { __typename?: 'QuestPolicy', context?: string | null, questPolicy: QuestPolicyType } | null }> | null, project?: { __typename?: 'Project', _id?: string | null, categories?: Array<CategoryType> | null, description?: string | null, imageUrl?: string | null, name: string, projectSocial?: { __typename?: 'ProjectSocial', discordUrl?: string | null, officialUrl?: string | null, telegramUrl?: string | null, twitterUrl?: string | null, mediumUrl?: string | null, naverBlogUrl?: string | null, kakaoUrl?: string | null } | null } | null, rewardPolicy?: { __typename?: 'RewardPolicy', context: string, rewardPoint: number, rewardPolicyType: RewardPolicyType } | null, winners?: Array<{ __typename?: 'User', name?: string | null }> | null }> };

export const UserItemFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}}]}}]} as unknown as DocumentNode<UserItemFragment, unknown>;
export const EventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"isVisibleOnly"},"value":{"kind":"BooleanValue","value":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<EventsQuery, EventsQueryVariables>;
export const CreateLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLinkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateLinkMutation, CreateLinkMutationVariables>;
export const LinksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"links"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"href"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<LinksQuery, LinksQueryVariables>;
export const CreateUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateUserByEmailMutation, CreateUserByEmailMutationVariables>;
export const UpdateUserMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;
export const UpdateUserEmailByAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailByAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserEmailByAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HandledError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailByAuthCodeMutation, UpdateUserEmailByAuthCodeMutationVariables>;
export const UpdateEventToHighestPriorityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEventToHighestPriority"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEventToHighestPriority"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}}]}}]}}]} as unknown as DocumentNode<UpdateEventToHighestPriorityMutation, UpdateEventToHighestPriorityMutationVariables>;
export const UpdateEventTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEventTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEventTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}}}]}]}}]} as unknown as DocumentNode<UpdateEventTypesMutation, UpdateEventTypesMutationVariables>;
export const GetUserByAccessTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getUserByAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByAccessToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserItem"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participatingTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}}]}}]} as unknown as DocumentNode<GetUserByAccessTokenQuery, GetUserByAccessTokenQueryVariables>;
export const SignInByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignInByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInByEmailMutation, SignInByEmailMutationVariables>;
export const UsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserItem"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserItem"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}}]}}]} as unknown as DocumentNode<UsersQuery, UsersQueryVariables>;
export const GetNonceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetNonce"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getNonce"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}]}]}}]} as unknown as DocumentNode<GetNonceMutation, GetNonceMutationVariables>;
export const SignInBySignatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignInBySignature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWalletInputType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInBySignature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInBySignatureMutation, SignInBySignatureMutationVariables>;
export const SignInByAptosSignatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignInByAptosSignature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWalletInputType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInByAptosSignature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInByAptosSignatureMutation, SignInByAptosSignatureMutationVariables>;
export const SignInByStacksSignatureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignInByStacksSignature"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWalletInputType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signature"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signInByStacksSignature"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"wallet"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallet"}}},{"kind":"Argument","name":{"kind":"Name","value":"publicKey"},"value":{"kind":"Variable","name":{"kind":"Name","value":"publicKey"}}},{"kind":"Argument","name":{"kind":"Name","value":"signature"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signature"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<SignInByStacksSignatureMutation, SignInByStacksSignatureMutationVariables>;
export const GetUsersOrderByRewardPointDescDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersOrderByRewardPointDesc"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"25"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"usersOrderByRewardPointDesc"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetUsersOrderByRewardPointDescQuery, GetUsersOrderByRewardPointDescQueryVariables>;
export const FindRankByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindRankByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findRankByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<FindRankByUserIdQuery, FindRankByUserIdQueryVariables>;
export const GetUserByKakaoIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByKakaoId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kakaoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByKakaoId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"kakaoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kakaoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participatingTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByKakaoIdQuery, GetUserByKakaoIdQueryVariables>;
export const GetUserByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"participatingTickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByNameQuery, GetUserByNameQueryVariables>;
export const GetUserByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const UserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"gmail"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<UserByGmailQuery, UserByGmailQueryVariables>;
export const GetUserByWalletAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserByWalletAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByWalletAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"walletAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"walletAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByWalletAddressQuery, GetUserByWalletAddressQueryVariables>;
export const ValidateAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"validateAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}]}}]} as unknown as DocumentNode<ValidateAuthCodeQuery, ValidateAuthCodeQueryVariables>;
export const SendAuthCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendAuthCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendAuthCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendAuthCodeMutation, SendAuthCodeMutationVariables>;
export const IsNeedEmailAccountMigrationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsNeedEmailAccountMigration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isNeedEmailAccountMigration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<IsNeedEmailAccountMigrationQuery, IsNeedEmailAccountMigrationQueryVariables>;
export const UpdatePasswordByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdatePasswordByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePasswordByEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"authCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"authCode"}}}]}]}}]} as unknown as DocumentNode<UpdatePasswordByEmailMutation, UpdatePasswordByEmailMutationVariables>;
export const CreateUserByGmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByGmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByGmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gmail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gmail"}}},{"kind":"Argument","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByGmailMutation, CreateUserByGmailMutationVariables>;
export const CreateUserByWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByWalletMutation, CreateUserByWalletMutationVariables>;
export const CreateUserByKakaoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUserByKakao"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kakaoInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KakaoInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUserByKakao"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"kakaoInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kakaoInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateUserByKakaoMutation, CreateUserByKakaoMutationVariables>;
export const UpdateUserWalletByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserWalletByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wallets"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserWalletInputType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"wallets"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wallets"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"chain"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserWalletByNameMutation, UpdateUserWalletByNameMutationVariables>;
export const UpdateUserProfileImageByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserProfileImageByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"profileImageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profileImageUrl"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateUserProfileImageByNameMutation, UpdateUserProfileImageByNameMutationVariables>;
export const UpdateUserAppAgreementByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserAppAgreementByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"appAgreement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AppAgreementInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"appAgreement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"appAgreement"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appAgreement"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"marketingPermission"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserAppAgreementByNameMutation, UpdateUserAppAgreementByNameMutationVariables>;
export const UpdateUserEmailByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserEmailByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<UpdateUserEmailByNameMutation, UpdateUserEmailByNameMutationVariables>;
export const UpdateUserRewardByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserRewardByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rewardPoint"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"rewardPoint"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rewardPoint"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}}]}}]}}]} as unknown as DocumentNode<UpdateUserRewardByNameMutation, UpdateUserRewardByNameMutationVariables>;
export const UpdateUserSocialByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserSocialByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userSocial"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserSocialInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userSocial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userSocial"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserSocialByNameMutation, UpdateUserSocialByNameMutationVariables>;
export const UpdateUserDiscordByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserDiscordByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"discord"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DiscordInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"discord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"discord"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discord"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accent_color"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"avatar_decoration"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"discriminator"}},{"kind":"Field","name":{"kind":"Name","value":"flags"}},{"kind":"Field","name":{"kind":"Name","value":"global_name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"locale"}},{"kind":"Field","name":{"kind":"Name","value":"mfa_enabled"}},{"kind":"Field","name":{"kind":"Name","value":"premium_type"}},{"kind":"Field","name":{"kind":"Name","value":"public_flags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserDiscordByNameMutation, UpdateUserDiscordByNameMutationVariables>;
export const UpdateUserTwitterByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserTwitterByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userSocial"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"twitterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"twitterId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"twitterId"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserTwitterByNameMutation, UpdateUserTwitterByNameMutationVariables>;
export const UpdateUserTelegramByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserTelegramByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"telegramUser"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TelegramUserInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"userUpdateInput"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userSocial"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"telegramUser"},"value":{"kind":"Variable","name":{"kind":"Name","value":"telegramUser"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"telegramUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authDate"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"hash"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"photoUrl"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserTelegramByNameMutation, UpdateUserTelegramByNameMutationVariables>;
export const UpdateKakaoByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateKakaoByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"kakaoInfo"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KakaoInputType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateKakaoByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"kakaoInfo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"kakaoInfo"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kakao"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"connected_at"}},{"kind":"Field","name":{"kind":"Name","value":"properties"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nickname"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail_image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"kakao_account"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"age_range"}},{"kind":"Field","name":{"kind":"Name","value":"age_range_needs_agreement"}},{"kind":"Field","name":{"kind":"Name","value":"birthday"}},{"kind":"Field","name":{"kind":"Name","value":"birthday_needs_agreement"}},{"kind":"Field","name":{"kind":"Name","value":"birthday_type"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"gender_needs_agreement"}},{"kind":"Field","name":{"kind":"Name","value":"has_age_range"}},{"kind":"Field","name":{"kind":"Name","value":"has_birthday"}},{"kind":"Field","name":{"kind":"Name","value":"has_gender"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image_needs_agreement"}},{"kind":"Field","name":{"kind":"Name","value":"profile_nickname_needs_agreement"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateKakaoByNameMutation, UpdateKakaoByNameMutationVariables>;
export const DeleteKakaoByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteKakaoByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteKakaoByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteKakaoByNameMutation, DeleteKakaoByNameMutationVariables>;
export const DeleteDiscordByNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteDiscordByName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteDiscordByName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteDiscordByNameMutation, DeleteDiscordByNameMutationVariables>;
export const TicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketSortType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketStatusType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"isVisibleOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"beginTime"}},{"kind":"Field","name":{"kind":"Name","value":"untilTime"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"description_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"eventTypes"}}]}}]}}]} as unknown as DocumentNode<TicketsQuery, TicketsQueryVariables>;
export const GetTicketByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetTicketById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"beginTime"}},{"kind":"Field","name":{"kind":"Name","value":"untilTime"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"description_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participantCount"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"questGuides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardClaimedUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"eventTypes"}}]}}]}}]} as unknown as DocumentNode<GetTicketByIdQuery, GetTicketByIdQueryVariables>;
export const ProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"eventTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsQuery, ProjectsQueryVariables>;
export const ProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectByIdQuery, ProjectByIdQueryVariables>;
export const TicketsByProjectIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TicketsByProjectId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketSortType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketStatusType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ticketsByProjectId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"isVisibleOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"description_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"eventTypes"}}]}}]}}]} as unknown as DocumentNode<TicketsByProjectIdQuery, TicketsByProjectIdQueryVariables>;
export const VerifyTwitterLinkingAndRetweetQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterLinkingAndRetweetQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterLinkingAndRetweetQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterLinkingAndRetweetQuestMutation, VerifyTwitterLinkingAndRetweetQuestMutationVariables>;
export const VerifyTwitterLikingQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterLikingQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterLikingQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterLikingQuestMutation, VerifyTwitterLikingQuestMutationVariables>;
export const VerifyTwitterFollowQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterFollowQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterFollowQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterFollowQuestMutation, VerifyTwitterFollowQuestMutationVariables>;
export const VerifyTwitterRetweetQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTwitterRetweetQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTwitterRetweetQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTwitterRetweetQuestMutation, VerifyTwitterRetweetQuestMutationVariables>;
export const Verify3ridgePointDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Verify3ridgePoint"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verify3ridgePoint"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<Verify3ridgePointMutation, Verify3ridgePointMutationVariables>;
export const VerifyDiscordQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyDiscordQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyDiscordQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyDiscordQuestMutation, VerifyDiscordQuestMutationVariables>;
export const IsCompletedQuestByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsCompletedQuestByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCompletedQuestByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isCompleted"}},{"kind":"Field","name":{"kind":"Name","value":"questId"}}]}}]}}]} as unknown as DocumentNode<IsCompletedQuestByUserIdQuery, IsCompletedQuestByUserIdQueryVariables>;
export const CompleteQuestOfUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteQuestOfUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeQuestOfUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}}]}}]} as unknown as DocumentNode<CompleteQuestOfUserMutation, CompleteQuestOfUserMutationVariables>;
export const ClaimRewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClaimReward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"claimReward"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ClaimRewardMutation, ClaimRewardMutationVariables>;
export const VerifyAptosQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyAptosQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyAptosQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyAptosQuestMutation, VerifyAptosQuestMutationVariables>;
export const IsRegisteredWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsRegisteredWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chain"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ChainType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isRegisteredWallet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"Argument","name":{"kind":"Name","value":"chain"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chain"}}}]}]}}]} as unknown as DocumentNode<IsRegisteredWalletQuery, IsRegisteredWalletQueryVariables>;
export const ClearParticipatedAllEventsByUserIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ClearParticipatedAllEventsByUserId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clearParticipatedAllEventsByUserId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}]}}]} as unknown as DocumentNode<ClearParticipatedAllEventsByUserIdMutation, ClearParticipatedAllEventsByUserIdMutationVariables>;
export const UpdateTicketVisibleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketVisible"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visible"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"visible"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visible"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketVisibleMutation, UpdateTicketVisibleMutationVariables>;
export const UpdateTicketShortDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketShortDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"shortDescription"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"shortDescription"},"value":{"kind":"Variable","name":{"kind":"Name","value":"shortDescription"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketShortDescriptionMutation, UpdateTicketShortDescriptionMutationVariables>;
export const UpdateTicketImageUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketImageUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketImageUrlMutation, UpdateTicketImageUrlMutationVariables>;
export const UpdateTicketTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketTitleMutation, UpdateTicketTitleMutationVariables>;
export const UpdateTicketProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketProjectMutation, UpdateTicketProjectMutationVariables>;
export const UpdateTicketDateRangeTimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketDateRangeTime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"untilTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"beginTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"untilTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"untilTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketDateRangeTimeMutation, UpdateTicketDateRangeTimeMutationVariables>;
export const UpdateTicketDescriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketDescription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description_v2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentMetadataInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description_v2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description_v2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketDescriptionMutation, UpdateTicketDescriptionMutationVariables>;
export const UpdateTicketRewardPolicyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTicketRewardPolicy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rewardPolicy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RewardPolicyInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"rewardPolicy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rewardPolicy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateTicketRewardPolicyMutation, UpdateTicketRewardPolicyMutationVariables>;
export const CreateQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title_v2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentMetadataInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questPolicy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestPolicyInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"title_v2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title_v2"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"questPolicy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questPolicy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateQuestMutation, CreateQuestMutationVariables>;
export const DeleteQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}}]}]}}]} as unknown as DocumentNode<DeleteQuestMutation, DeleteQuestMutationVariables>;
export const UpdateQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questPolicy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuestPolicyInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title_v2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentMetadataInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"questPolicy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questPolicy"}}},{"kind":"Argument","name":{"kind":"Name","value":"title_v2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title_v2"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateQuestMutation, UpdateQuestMutationVariables>;
export const CreateTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"beginTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"untilTime"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTime"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description_v2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ContentMetadataInputType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rewardPolicy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RewardPolicyInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createTicket"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"beginTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"beginTime"}}},{"kind":"Argument","name":{"kind":"Name","value":"description_v2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description_v2"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"rewardPolicy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rewardPolicy"}}},{"kind":"Argument","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"Argument","name":{"kind":"Name","value":"untilTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"untilTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateTicketMutation, CreateTicketMutationVariables>;
export const DeleteTicketDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTicket"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeTicketById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}}]}]}}]} as unknown as DocumentNode<DeleteTicketMutation, DeleteTicketMutationVariables>;
export const VerifySurveyQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifySurveyQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"surveyContents"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifySurveyQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"surveyContents"},"value":{"kind":"Variable","name":{"kind":"Name","value":"surveyContents"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifySurveyQuestMutation, VerifySurveyQuestMutationVariables>;
export const VerifyScreenShotQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyScreenShotQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"picUris"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyScreenShotQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"picUris"},"value":{"kind":"Variable","name":{"kind":"Name","value":"picUris"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyScreenShotQuestMutation, VerifyScreenShotQuestMutationVariables>;
export const RemoveProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categories"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CategoryType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"priority"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectSocial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectSocialInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"categories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categories"}}},{"kind":"Argument","name":{"kind":"Name","value":"priority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"priority"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectSocial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectSocial"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"priority"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectSocial"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectSocialInputType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"imageUrl"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"priority"},"value":{"kind":"Variable","name":{"kind":"Name","value":"priority"}}},{"kind":"Argument","name":{"kind":"Name","value":"projectSocial"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectSocial"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ReorderProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"reorderProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reorderProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}},{"kind":"Argument","name":{"kind":"Name","value":"to"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}}]}]}}]} as unknown as DocumentNode<ReorderProjectMutation, ReorderProjectMutationVariables>;
export const VerifyOnChainQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOnChainQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOnChainQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyOnChainQuestMutation, VerifyOnChainQuestMutationVariables>;
export const VerifyTelegramQuestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyTelegramQuest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"questId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyTelegramQuest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"questId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"questId"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<VerifyTelegramQuestMutation, VerifyTelegramQuestMutationVariables>;
export const AllTicketsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllTickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketSortType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"TicketStatusType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"eventTypes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventTypes"}}},{"kind":"Argument","name":{"kind":"Name","value":"isVisibleOnly"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isVisibleOnly"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"beginTime"}},{"kind":"Field","name":{"kind":"Name","value":"untilTime"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"description_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shortDescription"}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profileImageUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"title_v2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contentFormatType"}},{"kind":"Field","name":{"kind":"Name","value":"contentEncodingType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"questPolicy"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"categories"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"projectSocial"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discordUrl"}},{"kind":"Field","name":{"kind":"Name","value":"officialUrl"}},{"kind":"Field","name":{"kind":"Name","value":"telegramUrl"}},{"kind":"Field","name":{"kind":"Name","value":"twitterUrl"}},{"kind":"Field","name":{"kind":"Name","value":"mediumUrl"}},{"kind":"Field","name":{"kind":"Name","value":"naverBlogUrl"}},{"kind":"Field","name":{"kind":"Name","value":"kakaoUrl"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"context"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPoint"}},{"kind":"Field","name":{"kind":"Name","value":"rewardPolicyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"winners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"visible"}},{"kind":"Field","name":{"kind":"Name","value":"eventTypes"}}]}}]}}]} as unknown as DocumentNode<AllTicketsQuery, AllTicketsQueryVariables>;