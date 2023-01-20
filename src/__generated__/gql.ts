/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.GetUserByEmailDocument,
    "\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.UserByGmailDocument,
    "\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.GetUserByWalletAddressDocument,
    "\n  mutation CreateUserByEmail($email: String!) {\n    createUserByEmail(email: $email) {\n      name\n    }\n  }\n": types.CreateUserByEmailDocument,
    "\n  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {\n    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {\n      name\n    }\n  }\n": types.CreateUserByGmailDocument,
    "\n  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {\n    createUserByWallet(address: $address, chain: $chain) {\n      name\n    }\n  }\n": types.CreateUserByWalletDocument,
    "\n  mutation UpdateUserWalletByName(\n    $name: String!\n    $chain: ChainType!\n    $walletAddress: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { wallets: [{ chain: $chain, address: $walletAddress }] }\n    ) {\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.UpdateUserWalletByNameDocument,
    "\n  mutation UpdateUserProfileImageByName(\n    $name: String!\n    $profileImageUrl: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { profileImageUrl: $profileImageUrl }\n    ) {\n      profileImageUrl\n    }\n  }\n": types.UpdateUserProfileImageByNameDocument,
    "\n  mutation UpdateUserEmailByName($name: String!, $email: String!) {\n    updateUserByName(name: $name, userUpdateInput: { email: $email }) {\n      email\n    }\n  }\n": types.UpdateUserEmailByNameDocument,
    "\n  query AllTickets {\n    tickets {\n      description\n      completed\n      title\n      participants {\n        name\n        profileImageUrl\n      }\n      quests {\n        completedUsers {\n          name\n        }\n      }\n    }\n  }\n": types.AllTicketsDocument,
    "\n  query GetTicketById($id: String!) {\n    ticketById(id: $id) {\n      completed\n      description\n      participants {\n        name\n      }\n      quests {\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n": types.GetTicketByIdDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUserByEmail($email: String!) {\n    createUserByEmail(email: $email) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUserByEmail($email: String!) {\n    createUserByEmail(email: $email) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {\n    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {\n    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {\n    createUserByWallet(address: $address, chain: $chain) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {\n    createUserByWallet(address: $address, chain: $chain) {\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserWalletByName(\n    $name: String!\n    $chain: ChainType!\n    $walletAddress: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { wallets: [{ chain: $chain, address: $walletAddress }] }\n    ) {\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserWalletByName(\n    $name: String!\n    $chain: ChainType!\n    $walletAddress: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { wallets: [{ chain: $chain, address: $walletAddress }] }\n    ) {\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserProfileImageByName(\n    $name: String!\n    $profileImageUrl: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { profileImageUrl: $profileImageUrl }\n    ) {\n      profileImageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserProfileImageByName(\n    $name: String!\n    $profileImageUrl: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { profileImageUrl: $profileImageUrl }\n    ) {\n      profileImageUrl\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserEmailByName($name: String!, $email: String!) {\n    updateUserByName(name: $name, userUpdateInput: { email: $email }) {\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserEmailByName($name: String!, $email: String!) {\n    updateUserByName(name: $name, userUpdateInput: { email: $email }) {\n      email\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query AllTickets {\n    tickets {\n      description\n      completed\n      title\n      participants {\n        name\n        profileImageUrl\n      }\n      quests {\n        completedUsers {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query AllTickets {\n    tickets {\n      description\n      completed\n      title\n      participants {\n        name\n        profileImageUrl\n      }\n      quests {\n        completedUsers {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTicketById($id: String!) {\n    ticketById(id: $id) {\n      completed\n      description\n      participants {\n        name\n      }\n      quests {\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTicketById($id: String!) {\n    ticketById(id: $id) {\n      completed\n      description\n      participants {\n        name\n      }\n      quests {\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;