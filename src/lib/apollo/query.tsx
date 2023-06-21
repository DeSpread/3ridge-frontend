import { gql } from "../../__generated__";

export const GET_USERS_ORDER_BY_REWARD_POINT_DESC = gql(/* GraphQL */ `
  query GetUsersOrderByRewardPointDesc($skip: Int = 0, $limit: Int = 25) {
    usersOrderByRewardPointDesc(skip: $skip, limit: $limit) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
      }
    }
  }
`);

export const FIND_RANK_BY_USER_ID = gql(/* GraphQL */ `
  query FindRankByUserId($userId: String!) {
    findRankByUserId(userId: $userId)
  }
`);

export const GET_USER_BY_NAME = gql(/* GraphQL */ `
  query GetUserByName($name: String!) {
    userByName(name: $name) {
      _id
      email
      gmail
      name
      participatingTickets {
        _id
        imageUrl
        description
        project {
          _id
          categories
          description
          imageUrl
          name
        }
        rewardPolicy {
          context
          rewardPolicyType
        }
        title
        winners {
          _id
          name
        }
        quests {
          _id
        }
      }
      profileImageUrl
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
      wallets {
        address
        chain
      }
    }
  }
`);

export const GET_USER_BY_EMAIL = gql(/* GraphQL */ `
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const GET_USER_BY_GMAIL = gql(/* GraphQL */ `
  query userByGmail($gmail: String!) {
    userByGmail(gmail: $gmail) {
      _id
      name
      profileImageUrl
      gmail
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const GET_USER_BY_WALLET_ADDRESS = gql(/* GraphQL */ `
  query GetUserByWalletAddress($walletAddress: String!) {
    userByWalletAddress(walletAddress: $walletAddress) {
      _id
      name
      profileImageUrl
      email
      wallets {
        address
        chain
      }
      rewardPoint
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const CREATE_USER_BY_EMAIL = gql(/* GraphQL */ `
  mutation CreateUserByEmail($email: String!) {
    createUserByEmail(email: $email) {
      name
    }
  }
`);

export const CREATE_USER_BY_GMAIL = gql(/* GraphQL */ `
  mutation CreateUserByGmail($gmail: String!, $profileImageUrl: String!) {
    createUserByGmail(gmail: $gmail, profileImageUrl: $profileImageUrl) {
      name
    }
  }
`);

export const CREATE_USER_BY_WALLET = gql(/* GraphQL */ `
  mutation CreateUserByWallet($address: String!, $chain: ChainType!) {
    createUserByWallet(address: $address, chain: $chain) {
      name
    }
  }
`);

export const UPDATE_USER_WALLET_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserWalletByName(
    $name: String!
    $wallets: [UserWalletInputType!]
  ) {
    updateUserByName(name: $name, userUpdateInput: { wallets: $wallets }) {
      wallets {
        address
        chain
      }
    }
  }
`);

export const UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserProfileImageByName(
    $name: String!
    $profileImageUrl: String!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { profileImageUrl: $profileImageUrl }
    ) {
      profileImageUrl
    }
  }
`);

export const UPDATE_USER_BY_EMAIL = gql(/* GraphQL */ `
  mutation UpdateUserEmailByName($name: String!, $email: String!) {
    updateUserByName(name: $name, userUpdateInput: { email: $email }) {
      email
    }
  }
`);

export const UPDATE_USER_REWARD_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserRewardByName($name: String!, $rewardPoint: Float!) {
    updateUserByName(
      name: $name
      userUpdateInput: { rewardPoint: $rewardPoint }
    ) {
      rewardPoint
    }
  }
`);

export const UPDATE_USER_SOCIAL_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserSocialByName(
    $name: String!
    $userSocial: UserSocialInputType!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: $userSocial }
    ) {
      userSocial {
        twitterId
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const UPDATE_USER_BY_TWITTER = gql(/* GraphQL */ `
  mutation UpdateUserTwitterByName($name: String!, $twitterId: String!) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: { twitterId: $twitterId } }
    ) {
      userSocial {
        twitterId
      }
    }
  }
`);

export const UPDATE_USER_TELEGRAM_BY_NAME = gql(/* GraphQL */ `
  mutation UpdateUserTelegramByName(
    $name: String!
    $telegramUser: TelegramUserInputType!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { userSocial: { telegramUser: $telegramUser } }
    ) {
      userSocial {
        telegramUser {
          authDate
          firstName
          hash
          id
          photoUrl
          username
        }
      }
    }
  }
`);

export const GET_TICKETS = gql(/* GraphQL */ `
  query Tickets(
    $sort: TicketSortType
    $status: TicketStatusType
    $isVisibleOnly: Boolean
  ) {
    tickets(sort: $sort, status: $status, isVisibleOnly: $isVisibleOnly) {
      _id
      beginTime
      untilTime
      completed
      description
      participants {
        _id
        name
        profileImageUrl
      }
      imageUrl
      quests {
        _id
        title
        description
        questPolicy {
          context
          questPolicy
        }
      }
      project {
        _id
        categories
        description
        imageUrl
        name
        projectSocial {
          discordUrl
          officialUrl
          telegramUrl
          twitterUrl
          mediumUrl
        }
      }
      rewardPolicy {
        context
        rewardPolicyType
      }
      title
      winners {
        name
      }
    }
  }
`);

export const GET_TICKET_BY_ID = gql(/* GraphQL */ `
  query GetTicketById($id: String!) {
    ticketById(ticketId: $id) {
      _id
      beginTime
      untilTime
      completed
      description
      participants {
        _id
        name
        profileImageUrl
      }
      participantCount
      imageUrl
      quests {
        _id
        title
        description
        questPolicy {
          context
          questPolicy
        }
        questGuides {
          contentFormatType
          content
          contentEncodingType
        }
      }
      rewardPolicy {
        context
        rewardPolicyType
      }
      title
      winners {
        name
      }
      rewardClaimedUsers {
        _id
      }
    }
  }
`);

export const GET_PROJECTS = gql(/* GraphQL */ `
  query Projects {
    projects {
      _id
      categories
      description
      imageUrl
      name
      projectSocial {
        discordUrl
        officialUrl
        telegramUrl
        twitterUrl
        mediumUrl
      }
    }
  }
`);

export const GET_PROJECT_BY_ID = gql(/* GraphQL */ `
  query ProjectById($projectId: String!) {
    projectById(projectId: $projectId) {
      _id
      categories
      description
      imageUrl
      name
      projectSocial {
        discordUrl
        officialUrl
        telegramUrl
        twitterUrl
        mediumUrl
      }
    }
  }
`);

export const GET_TICKETS_BY_PROJECT_ID = gql(/* GraphQL */ `
  query TicketsByProjectId(
    $projectId: String!
    $sort: TicketSortType
    $status: TicketStatusType
  ) {
    ticketsByProjectId(projectId: $projectId, sort: $sort, status: $status) {
      _id
      completed
      description
      participants {
        name
        profileImageUrl
      }
      imageUrl
      quests {
        _id
        title
        description
        questPolicy {
          context
          questPolicy
        }
      }
      project {
        _id
        categories
        description
        imageUrl
        name
        projectSocial {
          discordUrl
          officialUrl
          telegramUrl
          twitterUrl
          mediumUrl
        }
      }
      rewardPolicy {
        context
        rewardPolicyType
      }
      title
      winners {
        name
      }
    }
  }
`);

export const VERIFY_TWITTER_LIKING_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterLikingQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterLikingQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_FOLLOW_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterFollowQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterFollowQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const VERIFY_3RIDGE_POINT_QUEST = gql(/* GraphQL */ `
  mutation Verify3ridgePoint(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verify3ridgePoint(questId: $questId, ticketId: $ticketId, userId: $userId) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_RETWEET_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterRetweetQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyTwitterRetweetQuest(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
    }
  }
`);

export const IS_COMPLETED_QUEST_BY_USER_ID = gql(/* GraphQL */ `
  query IsCompletedQuestByUserId($questId: String!, $userId: String!) {
    isCompletedQuestByUserId(questId: $questId, userId: $userId) {
      isCompleted
      questId
    }
  }
`);

export const COMPLETE_QUEST_OF_USER = gql(/* GraphQL */ `
  mutation CompleteQuestOfUser(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    completeQuestOfUser(
      questId: $questId
      ticketId: $ticketId
      userId: $userId
    ) {
      _id
      title
      description
      questPolicy {
        context
        questPolicy
      }
    }
  }
`);

export const CLAIM_REWARD = gql(/* GraphQL */ `
  mutation ClaimReward($ticketId: String!, $userId: String!) {
    claimReward(ticketId: $ticketId, userId: $userId)
  }
`);

// export const REQUEST_CLAIM_NFT = gql(/* GraphQL */ `
//   mutation RequestClaimNFT(
//     $collectionName: String!
//     $nftTokenName: String!
//     $receiverAddress: String!
//     $ticketId: String!
//     $userId: String!
//   ) {
//     requestClaimNFT(
//       collectionName: $collectionName
//       nftTokenName: $nftTokenName
//       receiverAddress: $receiverAddress
//       ticketId: $ticketId
//       userId: $userId
//     ) {
//       txHash
//     }
//   }
// `);

export const VERIFY_APTOS_QUEST = gql(/* GraphQL */ `
  mutation VerifyAptosQuest(
    $questId: String!
    $ticketId: String!
    $userId: String!
  ) {
    verifyAptosQuest(questId: $questId, ticketId: $ticketId, userId: $userId) {
      _id
    }
  }
`);

export const IS_REGISTER_WALLET = gql(/* GraphQL */ `
  query IsRegisteredWallet($address: String!, $chain: ChainType!) {
    isRegisteredWallet(address: $address, chain: $chain)
  }
`);

export const CLEAR_PARTICIPATED_ALL_EVENTS_BY_USER_ID = gql(/* GraphQL */ `
  mutation ClearParticipatedAllEventsByUserId($userId: String!) {
    clearParticipatedAllEventsByUserId(userId: $userId)
  }
`);
