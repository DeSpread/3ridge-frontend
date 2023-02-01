import { gql } from "../__generated__";

export const GET_USERS_ORDER_BY_REWARD_POINT_DESC = gql(/* GraphQL */ `
  query GetUsersOrderByRewardPointDesc {
    usersOrderByRewardPointDesc {
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
    $chain: ChainType!
    $walletAddress: String!
  ) {
    updateUserByName(
      name: $name
      userUpdateInput: { wallets: [{ chain: $chain, address: $walletAddress }] }
    ) {
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

export const GET_ALL_TICKETS = gql(/* GraphQL */ `
  query AllTickets {
    tickets {
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
        # completedUsers {
        #   _id
        #   name
        #   profileImageUrl
        #   email
        #   wallets {
        #     address
        #     chain
        #   }
        # }
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
    ticketById(id: $id) {
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
        # completedUsers {
        #  _id
        #  name
        #  profileImageUrl
        #  email
        #  wallets {
        #  address
        #  chain
        #  }
        # }
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

export const VERIFY_TWITTER_FOLLOW_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterFollowQuest($questId: String!, $userId: String!) {
    verifyTwitterFollowQuest(questId: $questId, userId: $userId) {
      _id
    }
  }
`);

export const VERIFY_TWITTER_RETWEET_QUEST = gql(/* GraphQL */ `
  mutation VerifyTwitterRetweetQuest($questId: String!, $userId: String!) {
    verifyTwitterRetweetQuest(questId: $questId, userId: $userId) {
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
  mutation CompleteQuestOfUser($questId: String!, $userId: String!) {
    completeQuestOfUser(questId: $questId, userId: $userId) {
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
