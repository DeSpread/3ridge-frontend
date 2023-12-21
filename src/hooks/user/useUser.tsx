"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { useLazyQuery, useMutation } from "@apollo/client";
import { getAnalytics, setUserId, logEvent } from "firebase/analytics";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { gql, useFragment as getFragment } from "@/__generated__";
import { UserItemFragment } from "@/__generated__/graphql";
import { useUserContext } from "@/app/(user)/user.provider";
import TypeHelper from "@/helper/type-helper";
import TypeParseHelper from "@/helper/type-parse-helper";
import { firebaseApp } from "@/lib/firebase/firebase-client";
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

const UserByAccessTokenQuery = gql(/* GraphQL */ `
  query getUserByAccessToken {
    userByAccessToken {
      ...UserItem
      wallets {
        address
        chain
      }
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
      kakao {
        id
        connected_at
        properties {
          nickname
          profile_image
          thumbnail_image
        }
      }
      discord {
        accent_color
        avatar
        avatar_decoration
        banner
        discriminator
        flags
        global_name
        id
        locale
        mfa_enabled
        premium_type
        public_flags
        username
      }
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
          rewardPoint
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
    }
  }
`);

const SignInByEmailMutation = gql(/* GraphQL */ `
  mutation SignInByEmail($email: String!, $password: String!) {
    signInByEmail(email: $email, password: $password) {
      _id
      accessToken
    }
  }
`);

export function useUser(args?: {
  onCompleted?: (user?: UserItemFragment) => void;
}) {
  const {
    userState: [user, setUser],
  } = useUserContext();
  const setUserData = useSetRecoilState(userDataState);
  const [userByAccessToken, { client }] = useLazyQuery(UserByAccessTokenQuery, {
    onCompleted(res) {
      const newUser = getFragment(Fragment, res.userByAccessToken) ?? undefined;

      args?.onCompleted?.(newUser);

      setUser(newUser);
    },
    onError() {
      args?.onCompleted?.(undefined);
    },
  });

  const [signInByEmailMutation] = useMutation(SignInByEmailMutation);

  useEffect(() => {
    handleChangeToken(getTokenFromStorage());
  }, []);

  function handleChangeToken(token?: string) {
    setTokenFromStorage(token);

    if (!token) {
      setUserData({});
      setUser(null);
      return;
    }

    userByAccessToken()
      .then((res) => {
        if (!res.data?.userByAccessToken) {
          return {};
        }

        const user = getFragment(Fragment, res.data.userByAccessToken);
        const { wallets, userSocial, discord, participatingTickets } =
          res.data.userByAccessToken;

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
          walletAddressInfos: wallets?.map((e) => {
            return {
              address: e.address,
              network: TypeHelper.convertToSuppoertedNetwork(e.chain),
            };
          }),
          userSocial: {
            twitterId: userSocial?.twitterId ?? undefined,
            telegramUser: userSocial?.telegramUser
              ? {
                  authDate: userSocial?.telegramUser.authDate ?? 0,
                  firstName: userSocial?.telegramUser.firstName ?? "",
                  hash: userSocial?.telegramUser.hash ?? "",
                  id: userSocial?.telegramUser.id ?? 0,
                  photoUrl: userSocial?.telegramUser.photoUrl ?? "",
                  username: userSocial?.telegramUser.username ?? "",
                }
              : undefined,
          },
          discord: discord ?? undefined,
          participatingTickets: participatingTickets
            ?.filter((e, index) => {
              return participatingTickets?.indexOf(e) === index;
            })
            ?.map((e) => {
              return {
                _id: e._id ?? undefined,
                title: e.title ?? undefined,
                description: e.description ?? undefined,
                project: e.project
                  ? {
                      _id: e.project?._id ?? undefined,
                      categories: e.project?.categories ?? undefined,
                      description: e.project?.description ?? undefined,
                      imageUrl: e.project?.imageUrl ?? undefined,
                      name: e.project.name,
                    }
                  : undefined,
                imageUrl: e.imageUrl ?? undefined,
                rewardPolicy: {
                  context: TypeParseHelper.parseRewardPolicy(
                    e.rewardPolicy?.context ?? undefined,
                    e.rewardPolicy?.rewardPolicyType ?? undefined,
                  ),
                  rewardPoint: e.rewardPolicy?.rewardPoint ?? undefined,
                  rewardPolicyType:
                    e.rewardPolicy?.rewardPolicyType ?? undefined,
                },
                quests: e.quests
                  ? e.quests?.map((e) => {
                      return { _id: e._id ?? undefined };
                    })
                  : undefined,
                winners: e.winners?.map((_e) => {
                  return {
                    name: _e.name ?? undefined,
                  };
                }),
              };
            }),
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
      if (res.data?.signInByEmail._id) {
        amplitude.setUserId(res.data.signInByEmail._id);
        amplitude.track({
          event_type: "Login",
          event_properties: { type: "email" },
        });
        const analytics = getAnalytics(firebaseApp);
        setUserId(analytics, res.data?.signInByEmail._id);
        logEvent(analytics, "login", {
          method: "email",
        });
      }
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
    user: user,
    loginByEmail,
    logout,
  };
}
