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
    "\n  query GetUsersOrderByRewardPointDesc($skip: Int = 0, $take: Int = 25) {\n    usersOrderByRewardPointDesc(skip: $skip, take: $take) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n": types.GetUsersOrderByRewardPointDescDocument,
    "\n  query FindRankByUserId($userId: String!) {\n    findRankByUserId(userId: $userId)\n  }\n": types.FindRankByUserIdDocument,
    "\n  query GetUserByName($name: String!) {\n    userByName(name: $name) {\n      _id\n      email\n      gmail\n      name\n      participatingTickets {\n        _id\n        imageUrl\n        description\n        project {\n          _id\n          categories\n          description\n          imageUrl\n          name\n        }\n        rewardPolicy {\n          context\n          rewardPolicyType\n        }\n        title\n      }\n      profileImageUrl\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.GetUserByNameDocument,
    "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n": types.GetUserByEmailDocument,
    "\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n": types.UserByGmailDocument,
    "\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n": types.GetUserByWalletAddressDocument,
    "\n  mutation CreateUserByEmail($email: String!) {\n    createUserByEmail(email: $email) {\n      name\n    }\n  }\n": types.CreateUserByEmailDocument,
    "\n  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {\n    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {\n      name\n    }\n  }\n": types.CreateUserByGmailDocument,
    "\n  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {\n    createUserByWallet(address: $address, chain: $chain) {\n      name\n    }\n  }\n": types.CreateUserByWalletDocument,
    "\n  mutation UpdateUserWalletByName(\n    $name: String!\n    $chain: ChainType!\n    $walletAddress: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { wallets: [{ chain: $chain, address: $walletAddress }] }\n    ) {\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n": types.UpdateUserWalletByNameDocument,
    "\n  mutation UpdateUserProfileImageByName(\n    $name: String!\n    $profileImageUrl: String!\n  ) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { profileImageUrl: $profileImageUrl }\n    ) {\n      profileImageUrl\n    }\n  }\n": types.UpdateUserProfileImageByNameDocument,
    "\n  mutation UpdateUserEmailByName($name: String!, $email: String!) {\n    updateUserByName(name: $name, userUpdateInput: { email: $email }) {\n      email\n    }\n  }\n": types.UpdateUserEmailByNameDocument,
    "\n  mutation UpdateUserRewardByName($name: String!, $rewardPoint: Float!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { rewardPoint: $rewardPoint }\n    ) {\n      rewardPoint\n    }\n  }\n": types.UpdateUserRewardByNameDocument,
    "\n  mutation UpdateUserTwitterByName($name: String!, $twitterId: String!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { userSocial: { twitterId: $twitterId } }\n    ) {\n      userSocial {\n        twitterId\n      }\n    }\n  }\n": types.UpdateUserTwitterByNameDocument,
    "\n  query Tickets($sort: TicketSortType, $status: TicketStatusType) {\n    tickets(sort: $sort, status: $status) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n": types.TicketsDocument,
    "\n  query GetTicketById($id: String!) {\n    ticketById(ticketId: $id) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n      rewardClaimedUsers {\n        _id\n      }\n    }\n  }\n": types.GetTicketByIdDocument,
    "\n  query Projects {\n    projects {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n": types.ProjectsDocument,
    "\n  query ProjectById($projectId: String!) {\n    projectById(projectId: $projectId) {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n": types.ProjectByIdDocument,
    "\n  query TicketsByProjectId($projectId: String!, $status: TicketStatusType) {\n    ticketsByProjectId(projectId: $projectId, status: $status) {\n      _id\n      completed\n      description\n      participants {\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n": types.TicketsByProjectIdDocument,
    "\n  mutation VerifyTwitterLikingQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterLikingQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n": types.VerifyTwitterLikingQuestDocument,
    "\n  mutation VerifyTwitterFollowQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterFollowQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n": types.VerifyTwitterFollowQuestDocument,
    "\n  mutation Verify3ridgePoint(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verify3ridgePoint(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n": types.Verify3ridgePointDocument,
    "\n  mutation VerifyTwitterRetweetQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterRetweetQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n": types.VerifyTwitterRetweetQuestDocument,
    "\n  query IsCompletedQuestByUserId($questId: String!, $userId: String!) {\n    isCompletedQuestByUserId(questId: $questId, userId: $userId) {\n      isCompleted\n      questId\n    }\n  }\n": types.IsCompletedQuestByUserIdDocument,
    "\n  mutation CompleteQuestOfUser(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    completeQuestOfUser(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n      title\n      description\n      questPolicy {\n        context\n        questPolicy\n      }\n    }\n  }\n": types.CompleteQuestOfUserDocument,
    "\n  mutation RequestClaimNFT(\n    $collectionName: String!\n    $nftTokenName: String!\n    $receiverAddress: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    requestClaimNFT(\n      collectionName: $collectionName\n      nftTokenName: $nftTokenName\n      receiverAddress: $receiverAddress\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      txHash\n    }\n  }\n": types.RequestClaimNftDocument,
    "\n  mutation VerifyAptosQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyAptosQuest(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n": types.VerifyAptosQuestDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUsersOrderByRewardPointDesc($skip: Int = 0, $take: Int = 25) {\n    usersOrderByRewardPointDesc(skip: $skip, take: $take) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUsersOrderByRewardPointDesc($skip: Int = 0, $take: Int = 25) {\n    usersOrderByRewardPointDesc(skip: $skip, take: $take) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FindRankByUserId($userId: String!) {\n    findRankByUserId(userId: $userId)\n  }\n"): (typeof documents)["\n  query FindRankByUserId($userId: String!) {\n    findRankByUserId(userId: $userId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByName($name: String!) {\n    userByName(name: $name) {\n      _id\n      email\n      gmail\n      name\n      participatingTickets {\n        _id\n        imageUrl\n        description\n        project {\n          _id\n          categories\n          description\n          imageUrl\n          name\n        }\n        rewardPolicy {\n          context\n          rewardPolicyType\n        }\n        title\n      }\n      profileImageUrl\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserByName($name: String!) {\n    userByName(name: $name) {\n      _id\n      email\n      gmail\n      name\n      participatingTickets {\n        _id\n        imageUrl\n        description\n        project {\n          _id\n          categories\n          description\n          imageUrl\n          name\n        }\n        rewardPolicy {\n          context\n          rewardPolicyType\n        }\n        title\n      }\n      profileImageUrl\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n      wallets {\n        address\n        chain\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserByEmail($email: String!) {\n    userByEmail(email: $email) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"): (typeof documents)["\n  query userByGmail($gmail: String!) {\n    userByGmail(gmail: $gmail) {\n      _id\n      name\n      profileImageUrl\n      gmail\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserByWalletAddress($walletAddress: String!) {\n    userByWalletAddress(walletAddress: $walletAddress) {\n      _id\n      name\n      profileImageUrl\n      email\n      wallets {\n        address\n        chain\n      }\n      rewardPoint\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"];
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
export function gql(source: "\n  mutation UpdateUserRewardByName($name: String!, $rewardPoint: Float!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { rewardPoint: $rewardPoint }\n    ) {\n      rewardPoint\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserRewardByName($name: String!, $rewardPoint: Float!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { rewardPoint: $rewardPoint }\n    ) {\n      rewardPoint\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUserTwitterByName($name: String!, $twitterId: String!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { userSocial: { twitterId: $twitterId } }\n    ) {\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserTwitterByName($name: String!, $twitterId: String!) {\n    updateUserByName(\n      name: $name\n      userUpdateInput: { userSocial: { twitterId: $twitterId } }\n    ) {\n      userSocial {\n        twitterId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Tickets($sort: TicketSortType, $status: TicketStatusType) {\n    tickets(sort: $sort, status: $status) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query Tickets($sort: TicketSortType, $status: TicketStatusType) {\n    tickets(sort: $sort, status: $status) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetTicketById($id: String!) {\n    ticketById(ticketId: $id) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n      rewardClaimedUsers {\n        _id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetTicketById($id: String!) {\n    ticketById(ticketId: $id) {\n      _id\n      beginTime\n      untilTime\n      completed\n      description\n      participants {\n        _id\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n      rewardClaimedUsers {\n        _id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Projects {\n    projects {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query Projects {\n    projects {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query ProjectById($projectId: String!) {\n    projectById(projectId: $projectId) {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query ProjectById($projectId: String!) {\n    projectById(projectId: $projectId) {\n      _id\n      categories\n      description\n      imageUrl\n      name\n      projectSocial {\n        discordUrl\n        officialUrl\n        telegramUrl\n        twitterUrl\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TicketsByProjectId($projectId: String!, $status: TicketStatusType) {\n    ticketsByProjectId(projectId: $projectId, status: $status) {\n      _id\n      completed\n      description\n      participants {\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query TicketsByProjectId($projectId: String!, $status: TicketStatusType) {\n    ticketsByProjectId(projectId: $projectId, status: $status) {\n      _id\n      completed\n      description\n      participants {\n        name\n        profileImageUrl\n      }\n      imageUrl\n      quests {\n        _id\n        title\n        description\n        questPolicy {\n          context\n          questPolicy\n        }\n      }\n      project {\n        _id\n        categories\n        description\n        imageUrl\n        name\n        projectSocial {\n          discordUrl\n          officialUrl\n          telegramUrl\n          twitterUrl\n        }\n      }\n      rewardPolicy {\n        context\n        rewardPolicyType\n      }\n      title\n      winners {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyTwitterLikingQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterLikingQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyTwitterLikingQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterLikingQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyTwitterFollowQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterFollowQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyTwitterFollowQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterFollowQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Verify3ridgePoint(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verify3ridgePoint(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation Verify3ridgePoint(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verify3ridgePoint(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyTwitterRetweetQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterRetweetQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyTwitterRetweetQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyTwitterRetweetQuest(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query IsCompletedQuestByUserId($questId: String!, $userId: String!) {\n    isCompletedQuestByUserId(questId: $questId, userId: $userId) {\n      isCompleted\n      questId\n    }\n  }\n"): (typeof documents)["\n  query IsCompletedQuestByUserId($questId: String!, $userId: String!) {\n    isCompletedQuestByUserId(questId: $questId, userId: $userId) {\n      isCompleted\n      questId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CompleteQuestOfUser(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    completeQuestOfUser(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n      title\n      description\n      questPolicy {\n        context\n        questPolicy\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CompleteQuestOfUser(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    completeQuestOfUser(\n      questId: $questId\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      _id\n      title\n      description\n      questPolicy {\n        context\n        questPolicy\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestClaimNFT(\n    $collectionName: String!\n    $nftTokenName: String!\n    $receiverAddress: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    requestClaimNFT(\n      collectionName: $collectionName\n      nftTokenName: $nftTokenName\n      receiverAddress: $receiverAddress\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      txHash\n    }\n  }\n"): (typeof documents)["\n  mutation RequestClaimNFT(\n    $collectionName: String!\n    $nftTokenName: String!\n    $receiverAddress: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    requestClaimNFT(\n      collectionName: $collectionName\n      nftTokenName: $nftTokenName\n      receiverAddress: $receiverAddress\n      ticketId: $ticketId\n      userId: $userId\n    ) {\n      txHash\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation VerifyAptosQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyAptosQuest(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation VerifyAptosQuest(\n    $questId: String!\n    $ticketId: String!\n    $userId: String!\n  ) {\n    verifyAptosQuest(questId: $questId, ticketId: $ticketId, userId: $userId) {\n      _id\n    }\n  }\n"];

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