import {
  QueryFunctionOptions,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { gql, useFragment as getFragment } from "@/__generated__";
import {
  SignInByEmailDocument,
  UserItemFragment,
} from "@/__generated__/graphql";
import { userDataState } from "@/lib/recoil";

const LOCAL_STORAGE_TOKEN_KEY = "accessToken";

const Fragment = gql(/* GraphQL */ `
  fragment UserItem on User {
    _id
    name
    profileImageUrl
    email
    type
    rewardPoint
  }
`);

const Query = gql(/* GraphQL */ `
  query getUserByAccessToken {
    userByAccessToken {
      ...UserItem
    }
  }
`);

export function useUser(args?: {
  onCompleted?: (user?: UserItemFragment) => void;
}) {
  const setUserData = useSetRecoilState(userDataState);
  const [userByAccessToken, { client, data: userByAccessTokenData }] =
    useLazyQuery(Query, {
      onCompleted(res) {
        args?.onCompleted?.(
          getFragment(Fragment, res.userByAccessToken) ?? undefined,
        );
      },
      onError() {
        args?.onCompleted?.(undefined);
      },
    });

  const [signInByEmailMutation] = useMutation(SignInByEmailDocument);

  useEffect(() => {
    handleChangeToken(getTokenFromStorage());
  }, []);

  function handleChangeToken(token?: string) {
    setTokenFromStorage(token);

    userByAccessToken()
      .then((res) => {
        const user = getFragment(Fragment, res.data?.userByAccessToken);

        if (!user) {
          return {};
        }

        return {
          _id: user?._id ?? undefined,
          email: user?.email ?? undefined,
          name: user?.name ?? undefined,
          rewardPoint: user?.rewardPoint ?? undefined,
          profileImageUrl: user?.profileImageUrl ?? undefined,
          type: user?.type ?? undefined,
        };
      })
      .then(setUserData);
  }

  function getTokenFromStorage() {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? undefined;
  }

  function setTokenFromStorage(token?: string) {
    if (token) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }
  }

  function loginByEmail(email: string, password: string) {
    return signInByEmailMutation({
      variables: {
        email,
        password,
      },
    }).then((res) => {
      const newAccessToken = res.data?.signInByEmail.accessToken ?? undefined;

      handleChangeToken(newAccessToken);

      return res;
    });
  }

  function logout() {
    client.resetStore().then(() => {
      handleChangeToken(undefined);
    });
  }

  return {
    user:
      getFragment(Fragment, userByAccessTokenData?.userByAccessToken) ??
      undefined,
    loginByEmail,
    logout,
  };
}