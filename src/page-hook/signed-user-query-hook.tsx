import { useLogin } from "../provider/login/login-provider";
import { client } from "../apollo/client";
import { useEffect, useRef, useState } from "react";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_GMAIL,
  GET_USER_BY_WALLET_ADDRESS,
  UPDATE_USER_BY_EMAIL,
  UPDATE_USER_BY_TWITTER,
  UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME,
  UPDATE_USER_REWARD_BY_NAME,
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
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const useSignedUserQuery = () => {
  const { connect, account, network, connected, disconnect, wallet, wallets } =
    useWallet();
  const triedConnectWallet = useRef<boolean>(false);

  const [UpdateUserWalletByName] = useMutation(UPDATE_USER_WALLET_BY_NAME);
  const [UpdateUserProfileImageByName] = useMutation(
    UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME
  );
  const [UpdateUserEmailByName] = useMutation(UPDATE_USER_BY_EMAIL);
  const [UpdateUserTwitterByName] = useMutation(UPDATE_USER_BY_TWITTER);
  const [UpdateUserRewardByName] = useMutation(UPDATE_USER_REWARD_BY_NAME);

  const userData = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);
  const [loading, setLoading] = useState(false);

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
          if (!walletLoggedInInfo.walletAddress) {
            setLoading(false);
            return;
          }
          const res = await client.query({
            query: GET_USER_BY_WALLET_ADDRESS,
            variables: {
              walletAddress: walletLoggedInInfo.walletAddress ?? "",
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

  useEffect(() => {
    if (triedConnectWallet.current) {
      console.log("triedConnectWallet");
      if (!account) {
        triedConnectWallet.current = false;
        return;
      }
      const newAccount = account.address;
      (async () => {
        if (!userData.name) {
          triedConnectWallet.current = false;
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
      })();
      triedConnectWallet.current = false;
    }
  }, [connected]);

  const asyncUpdateWalletAddressByWallet = async () => {
    try {
      if (!userData.name) return;
      let newAccount: string | undefined = undefined;
      if (wallets[0].readyState === "NotDetected") {
        throw new AppError(APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED);
        return;
      }
      if (!connected || !account) {
        await connect(wallets[0].name);
        triedConnectWallet.current = true;
        return;
      }
      newAccount = account.address;
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
          chain: ChainType.Aptos,
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

  const asyncUpdateRewardPoint = async (rewardPoint: number) => {
    try {
      if (!userData.name) return;
      await UpdateUserRewardByName({
        variables: {
          name: userData.name,
          rewardPoint,
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          rewardPoint,
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
    asyncUpdateRewardPoint,
  };
};

export { useSignedUserQuery };
