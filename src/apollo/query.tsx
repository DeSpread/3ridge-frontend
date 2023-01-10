import { gql } from "../__generated__";

export const GET_USER_BY_EMAIL = gql(/* GraphQL */ `
  query GetUserByEmail($email: String!) {
    userByEmail(email: $email) {
      _id
      name
      profileImageUrl
      email
      wallet {
        address
        chainType
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
      wallet {
        address
        chainType
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
      wallet {
        address
        chainType
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
