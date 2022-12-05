import { gql } from "../__generated__/gql";

export const GET_ROCKET_INVENTORY = gql(`
  query LocationQuery {
    locations {
      id
    }
  }
`);
