import { gql } from "../../__generated__";
import { useLogin } from "../../provider/login/login-provider";
import { useQuery } from "@apollo/client";

const USER_BY_GMAIL = gql(/* GraphQL */ `
  query userByGmail($gmail: String!) {
    userByGmail(gmail: $gmail) {
      name
      profileImageUrl
    }
  }
`);

const useFindUserQuery = () => {
  const { isGoogleLoggedIn, googleUserInfo, isWalletConnected } = useLogin();

  const { data, loading } = useQuery(
    USER_BY_GMAIL,
    googleUserInfo.gmail
      ? {
          variables: {
            gmail: googleUserInfo.gmail,
          },
        }
      : undefined
  );

  if (isGoogleLoggedIn) {
    return { data: data?.userByGmail, loading };
  }

  return { data: null, loading: false };
};

// const create

export { useFindUserQuery };
