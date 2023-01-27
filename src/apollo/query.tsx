import { gql } from "../__generated__";

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

export const GET_ALL_TICKETS = gql(/* GraphQL */ `
  query AllTickets {
    tickets {
      description
      completed
      title
      participants {
        name
        profileImageUrl
      }
      quests {
        completedUsers {
          name
        }
      }
    }
  }
`);

export const GET_TICKET_BY_ID = gql(/* GraphQL */ `
  query GetTicketById($id: String!) {
    ticketById(id: $id) {
      completed
      description
      participants {
        name
        profileImageUrl
      }
      quests {
        _id
        title
        description
        questPolicy {
          context
          questPolicy
        }
        completedUsers {
          _id
          name
          profileImageUrl
          email
          wallets {
            address
            chain
          }
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
