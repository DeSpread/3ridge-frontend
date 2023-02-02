import { useLogin } from "../provider/login/login-provider";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_GMAIL,
  GET_USER_BY_WALLET_ADDRESS,
  UPDATE_USER_BY_EMAIL,
  UPDATE_USER_BY_TWITTER,
  UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME,
  UPDATE_USER_WALLET_BY_NAME,
} from "../apollo/query";
import { ChainType } from "../__generated__/graphql";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
} from "../error/my-error";
import { useAccount, useConnect } from "wagmi";
import { useMutation } from "@apollo/client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataState } from "../recoil";

const useSignedUserQuery = () => {
  const { connectAsync, connectors } = useConnect();
  const [UpdateUserWalletByName] = useMutation(UPDATE_USER_WALLET_BY_NAME);
  const [UpdateUserProfileImageByName] = useMutation(
    UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME
  );
  const [UpdateUserEmailByName] = useMutation(UPDATE_USER_BY_EMAIL);
  const [UpdateUserTwitterByName] = useMutation(UPDATE_USER_BY_TWITTER);

  const userData = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();

  const {
    isGoogleLoggedIn,
    isMailLoggedIn,
    isWalletLoggedIn,
    emailLoggedInInfo,
    googleLoggedInInfo,
    walletLoggedInInfo,
  } = useLogin();

  useEffect(() => {
    if (isMailLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          if (!emailLoggedInInfo.mail) {
            setLoading(false);
            return;
          }
          const res = await client.query({
            query: GET_USER_BY_EMAIL,
            variables: {
              email: emailLoggedInInfo.mail,
            },
            fetchPolicy: "no-cache",
          });
          const {
            email,
            name,
            profileImageUrl,
            wallets,
            _id,
            rewardPoint,
            userSocial,
          } = res.data.userByEmail;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
              rewardPoint: rewardPoint ?? undefined,
              userSocial: {
                twitterId: userSocial?.twitterId ?? "",
              },
            };
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      })();
    } else {
      setUserData({});
    }
  }, [isMailLoggedIn]);

  useEffect(() => {
    if (isGoogleLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          if (!googleLoggedInInfo.gmail) {
            setLoading(false);
            return;
          }
          const res = await client.query({
            query: GET_USER_BY_GMAIL,
            variables: {
              gmail: googleLoggedInInfo.gmail,
            },
            fetchPolicy: "no-cache",
          });
          const {
            gmail,
            name,
            profileImageUrl,
            wallets,
            _id,
            rewardPoint,
            userSocial,
          } = res.data.userByGmail;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: gmail ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
              rewardPoint: rewardPoint ?? undefined,
              userSocial: {
                twitterId: userSocial?.twitterId ?? "",
              },
            };
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      })();
    } else {
      setUserData({});
    }
  }, [isGoogleLoggedIn]);

  useEffect(() => {
    if (isWalletLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          if (!walletLoggedInInfo.address) {
            setLoading(false);
            return;
          }
          const res = await client.query({
            query: GET_USER_BY_WALLET_ADDRESS,
            variables: {
              walletAddress: walletLoggedInInfo.address ?? "",
            },
            fetchPolicy: "no-cache",
          });
          const {
            email,
            name,
            profileImageUrl,
            wallets,
            _id,
            rewardPoint,
            userSocial,
          } = res.data.userByWalletAddress;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
              rewardPoint: rewardPoint ?? undefined,
              userSocial: {
                twitterId: userSocial?.twitterId ?? "",
              },
            };
          });
        } catch (e) {
          setLoading(false);
        }
      })();
    } else {
      setUserData({});
    }
  }, [isWalletLoggedIn]);

  const asyncUpdateWalletAddressByWallet = async () => {
    try {
      if (!userData.name) return;
      let newAccount = address;
      if (!address) {
        const { account } = await connectAsync({ connector: connectors[0] });
        newAccount = account;
      }
      if (!newAccount) {
        throw new AppError(APP_ERROR_MESSAGE.WALLET_USER_ACCOUNT_FETCH_FAIL);
        return;
      }
      await UpdateUserWalletByName({
        variables: {
          name: userData.name,
          chain: ChainType.Evm,
          walletAddress: newAccount,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          walletAddress: newAccount,
        };
      });
    } catch (e) {
      const message = getErrorMessage(e);
      if (message === APP_ERROR_MESSAGE.WALLET_USER_REJECTED_REQUEST) {
        return;
      }
      throw e;
    }
  };

  const asyncUpdateWalletAddress = async (walletAddress: string) => {
    try {
      if (!userData.name) return;
      await UpdateUserWalletByName({
        variables: {
          name: userData.name,
          chain: ChainType.Evm,
          walletAddress: walletAddress,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          walletAddress: walletAddress,
        };
      });
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const asyncUpdateProfileImageUrl = async (profileImageUrl: string) => {
    try {
      if (!userData.name) return;
      await UpdateUserProfileImageByName({
        variables: {
          name: userData.name,
          profileImageUrl,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          profileImageUrl: profileImageUrl,
        };
      });
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const asyncUpdateSocialTwitter = async (twitterId: string) => {
    console.log(twitterId);
    try {
      if (!userData.name) return;
      await UpdateUserTwitterByName({
        variables: {
          name: userData.name,
          twitterId: twitterId,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          userSocial: {
            twitterId,
          },
        };
      });
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const asyncUpdateEmail = async (email: string) => {
    try {
      if (!userData.name) return;
      await UpdateUserEmailByName({
        variables: {
          name: userData.name,
          email,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          email,
        };
      });
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  return {
    userData,
    loading,
    asyncUpdateWalletAddressByWallet,
    asyncUpdateWalletAddress,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
    asyncUpdateSocialTwitter,
  };
};

export { useSignedUserQuery };
