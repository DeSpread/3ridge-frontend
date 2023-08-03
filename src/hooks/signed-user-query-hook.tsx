import { useLogin } from "../provider/login/login-provider";
import { client } from "../lib/apollo/client";
import { useEffect, useRef, useState } from "react";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_GMAIL,
  GET_USER_BY_WALLET_ADDRESS,
  IS_REGISTER_WALLET,
  UPDATE_USER_BY_EMAIL,
  UPDATE_USER_BY_TWITTER,
  UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME,
  UPDATE_USER_REWARD_BY_NAME,
  UPDATE_USER_SOCIAL_BY_NAME,
  UPDATE_USER_TELEGRAM_BY_NAME,
  UPDATE_USER_WALLET_BY_NAME,
} from "../lib/apollo/query";
import {
  APP_ERROR_MESSAGE,
  AppError,
  getErrorMessage,
  getLocaleErrorMessage,
} from "../error/my-error";
import { useMutation } from "@apollo/client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataState } from "../lib/recoil";
import TypeHelper from "../helper/type-helper";
import {
  SUPPORTED_NETWORKS,
  SupportedNetwork,
  TelegramUserInfo,
  WalletName,
} from "../type";
import { useTotalWallet } from "../provider/login/hook/total-wallet-hook";
import { ChainType } from "../__generated__/graphql";
import TelegramUtil from "../util/telegram-util";
import { delay } from "../util/timer";
import PreferenceHelper from "../helper/preference-helper";
import { useAlert } from "../provider/alert/alert-provider";
import { useProfileEditDialog } from "./profile-edit-dialog-hook";

const useSignedUserQuery = () => {
  const {
    asyncConnectWallet,
    changedCounter,
    getAccountAddress,
    isWalletInstalled,
  } = useTotalWallet();

  const [UpdateUserWalletByName] = useMutation(UPDATE_USER_WALLET_BY_NAME);
  const [UpdateUserProfileImageByName] = useMutation(
    UPDATE_USER_PROFILE_IMAGE_URL_BY_NAME
  );
  const [UpdateUserEmailByName] = useMutation(UPDATE_USER_BY_EMAIL);
  const [UpdateUserTwitterByName] = useMutation(UPDATE_USER_BY_TWITTER);
  const [UpdateUserTelegramByName] = useMutation(UPDATE_USER_TELEGRAM_BY_NAME);
  const [UpdateUserRewardByName] = useMutation(UPDATE_USER_REWARD_BY_NAME);
  const [UpdateUserSocialByName] = useMutation(UPDATE_USER_SOCIAL_BY_NAME);

  const userData = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);
  const [loading, setLoading] = useState(false);

  const tryConnectWalletNetwork = useRef<string>("");

  const { showAlert, showErrorAlert } = useAlert();
  const { isProfileEditDialogOpen, setShowProfileEditDialog } =
    useProfileEditDialog();

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
          updateUserData(res.data.userByEmail);
          console.log(res.data.userByEmail);
        } catch (e) {
          throw new AppError(getErrorMessage(e));
        } finally {
          setLoading(false);
        }
      })();
    } else {
      if (!isGoogleLoggedIn && !isWalletLoggedIn) {
        setUserData({});
        // console.log("isMailLoggedIn {}");
      }
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
          updateUserData(res.data.userByGmail);
        } catch (e) {
          throw new AppError(getErrorMessage(e));
        } finally {
          setLoading(false);
        }
      })();
    } else {
      if (!isMailLoggedIn && !isWalletLoggedIn) {
        // console.log("isGoogleLoggedIn {}");
        setUserData({});
      }
    }
  }, [isGoogleLoggedIn]);

  useEffect(() => {
    if (walletLoggedInInfo.address) {
      // console.log("walletLoggedInInfo.address", walletLoggedInInfo.address);
      (async () => {
        try {
          setLoading(true);
          if (!walletLoggedInInfo.address) {
            setLoading(false);
            return;
          }
          await delay(100);
          const res = await client.query({
            query: GET_USER_BY_WALLET_ADDRESS,
            variables: {
              walletAddress: walletLoggedInInfo.address ?? "",
            },
            fetchPolicy: "no-cache",
          });
          updateUserData(res.data.userByWalletAddress);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      if (!isMailLoggedIn && !isGoogleLoggedIn) {
        // console.log("isWalletLoggedIn {}");
        setUserData({});
      }
    }
  }, [isWalletLoggedIn, changedCounter, walletLoggedInInfo]);

  useEffect(() => {
    try {
      if (tryConnectWalletNetwork.current) {
        const network = TypeHelper.convertToSuppoertedNetwork(
          tryConnectWalletNetwork.current
        );
        const accountAddress = getAccountAddress(network);
        if (accountAddress) {
          _asyncUpsertWalletAddress(network, accountAddress).then((res) => {});
        }
      }
    } catch (e) {
      showErrorAlert({ content: getLocaleErrorMessage(e) });
    } finally {
      tryConnectWalletNetwork.current = "";
    }
  }, [changedCounter]);

  useEffect(() => {
    try {
      const { network, timestamp } = PreferenceHelper.getTryConnectWallet();
      if (network && timestamp) {
        const accountAddress = getAccountAddress(network);
        if (accountAddress) {
          _asyncUpsertWalletAddress(network, accountAddress).then((res) => {});
        }
        setShowProfileEditDialog(true);
        PreferenceHelper.clearTryConnectWallet();
      }
    } catch (e) {
      showErrorAlert({ content: getLocaleErrorMessage(e) });
      setShowProfileEditDialog(true);
      PreferenceHelper.clearTryConnectWallet();
    }
  }, []);

  const updateUserData = (data: {
    __typename?: "User";
    _id?: string | null;
    name?: string | null;
    profileImageUrl?: string | null;
    email?: string | null;
    gmail?: string | null;
    rewardPoint?: number | null;
    wallets?: Array<{
      __typename?: "UserWallet";
      address: string;
      chain: ChainType;
    }> | null;
    userSocial?: {
      __typename?: "UserSocial";
      twitterId?: string | null;
      telegramUser?: {
        __typename?: "TelegramUser";
        authDate?: number | null;
        firstName?: string | null;
        hash?: string | null;
        id: number;
        photoUrl?: string | null;
        username: string;
      } | null;
    } | null;
  }) => {
    const {
      email,
      name,
      profileImageUrl,
      wallets,
      _id,
      rewardPoint,
      userSocial,
      gmail,
    } = data;
    setUserData((prevState) => {
      return {
        ...prevState,
        _id: _id ?? undefined,
        email: email ?? undefined,
        gmail: gmail ?? undefined,
        name: name ?? undefined,
        profileImageUrl: profileImageUrl ?? undefined,
        walletAddressInfos: wallets?.map((e) => {
          return {
            address: e.address,
            network: TypeHelper.convertToSuppoertedNetwork(e.chain),
          };
        }),
        rewardPoint: rewardPoint ?? undefined,
        userSocial: {
          twitterId: userSocial?.twitterId ?? "",
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
      };
    });
  };

  const asyncUpsertWalletAddress = async (
    network: SupportedNetwork,
    walletName: WalletName
  ) => {
    console.log("asyncUpsertWalletAddress - network", network);
    if (!isWalletInstalled(network, walletName)) {
      throw new AppError(APP_ERROR_MESSAGE.WALLET_NOT_INSTALLED, network);
    }
    const accountAddress = getAccountAddress(network);
    console.log("asyncUpsertWalletAddress - accountAddress", accountAddress);
    if (!accountAddress) {
      await asyncConnectWallet(network, walletName);
      if (network === SUPPORTED_NETWORKS.SUI) {
        PreferenceHelper.updateTryConnectWallet(network);
      } else {
        tryConnectWalletNetwork.current = network;
      }
      return;
    }
    await _asyncUpsertWalletAddress(network, accountAddress);
  };

  const asyncDeleteWalletAddress = async (network: SupportedNetwork) => {
    try {
      await _asyncUpsertWalletAddress(network, "");
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const _asyncUpsertWalletAddress = async (
    network: SupportedNetwork,
    walletAddress: string
  ) => {
    try {
      console.log("_asyncUpsertWalletAddress", network, walletAddress);
      if (walletAddress) {
        const exist = await client.query({
          query: IS_REGISTER_WALLET,
          variables: {
            address: walletAddress,
            chain: TypeHelper.convertToChainType(network),
          },
          fetchPolicy: "no-cache",
        });
        console.log(
          "_asyncUpsertWalletAddress, exist.data.isRegisteredWallet",
          exist.data.isRegisteredWallet
        );
        if (exist.data.isRegisteredWallet) {
          throw new AppError(
            APP_ERROR_MESSAGE.WALLET_ADDRESS_ALREADY_REGISTERED
          );
        }
      }
      console.log("_asyncUpsertWalletAddress - userData.name", userData.name);
      if (!userData.name) return;
      const doInsert =
        userData?.walletAddressInfos?.filter((e) => e.network === network)
          .length ?? 0 > 0
          ? false
          : true;
      console.log("_asyncUpsertWalletAddress - doInsert", doInsert);
      let newWalletAddressInfos = userData?.walletAddressInfos;
      if (doInsert) {
        newWalletAddressInfos = userData?.walletAddressInfos
          ? [
              ...userData?.walletAddressInfos,
              {
                address: walletAddress,
                network: network,
              },
            ]
          : [
              {
                address: walletAddress,
                network: network,
              },
            ];
      }
      console.log(
        "_asyncUpsertWalletAddress - newWalletAddressInfos",
        newWalletAddressInfos
      );
      await UpdateUserWalletByName({
        variables: {
          name: userData.name,
          wallets: newWalletAddressInfos?.map((e) => {
            if (e.network === network) {
              return {
                chain: TypeHelper.convertToChainType(e.network),
                address: walletAddress,
              };
            }
            return {
              chain: TypeHelper.convertToChainType(e.network),
              address: e.address,
            };
          }),
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          walletAddressInfos: newWalletAddressInfos?.map((e) => {
            if (e.network === network) {
              return {
                network: e.network,
                address: walletAddress,
              };
            }
            return e;
          }),
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

  const asyncUpdateSocialTwitter = async (twitterId: string) => {
    console.log(twitterId, userData.userSocial?.telegramUser);
    try {
      if (!userData.name) return;
      await UpdateUserSocialByName({
        variables: {
          name: userData.name,
          userSocial: {
            twitterId,
            telegramUser: userData.userSocial?.telegramUser
              ? {
                  authDate: userData.userSocial?.telegramUser?.authDate,
                  firstName: userData.userSocial?.telegramUser?.firstName,
                  hash: userData.userSocial?.telegramUser?.hash,
                  id: userData.userSocial?.telegramUser?.id ?? 0,
                  photoUrl: userData.userSocial?.telegramUser?.photoUrl,
                  username: userData.userSocial?.telegramUser?.username ?? "",
                }
              : undefined,
          },
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          userSocial: {
            twitterId,
            telegramUser: userData.userSocial?.telegramUser
              ? {
                  authDate: userData.userSocial?.telegramUser.authDate ?? 0,
                  firstName: userData.userSocial?.telegramUser.firstName ?? "",
                  hash: userData.userSocial?.telegramUser.hash ?? "",
                  id: userData.userSocial?.telegramUser.id ?? 0,
                  photoUrl: userData.userSocial?.telegramUser.photoUrl ?? "",
                  username: userData.userSocial?.telegramUser.username ?? "",
                }
              : undefined,
          },
        };
      });
    } catch (e) {
      throw new AppError(getErrorMessage(e));
    }
  };

  const asyncRemoveSocialTelegram = async () => {
    await UpdateUserSocialByName({
      variables: {
        //@ts-ignore
        name: userData.name,
        userSocial: {
          twitterId: userData.userSocial?.twitterId,
          telegramUser: undefined,
        },
      },
    });
    setUserData((prevState) => {
      return {
        ...prevState,
        userSocial: {
          twitterId: userData?.userSocial?.twitterId,
          telegramUser: undefined,
        },
      };
    });
  };

  const asyncUpdateSocialTelegram = async () => {
    try {
      if (!userData.name) return;
      const data = await TelegramUtil.asyncLogin();
      const newTelegramUserInfo: TelegramUserInfo = {
        authDate: data["auth_date"],
        firstName: data["first_name"],
        hash: data["hash"],
        id: data["id"],
        photoUrl: data["photo_url"],
        username: data["username"],
      };
      await UpdateUserSocialByName({
        variables: {
          //@ts-ignore
          name: userData.name,
          userSocial: {
            twitterId: userData.userSocial?.twitterId,
            telegramUser: {
              authDate: newTelegramUserInfo.authDate,
              firstName: newTelegramUserInfo.firstName,
              hash: newTelegramUserInfo.hash,
              id: newTelegramUserInfo.id,
              photoUrl: newTelegramUserInfo.photoUrl ?? "",
              username: newTelegramUserInfo.username
                ? newTelegramUserInfo.username
                : newTelegramUserInfo.firstName,
            },
          },
        },
      });
      setUserData((prevState) => {
        return {
          ...prevState,
          userSocial: {
            twitterId: userData?.userSocial?.twitterId,
            telegramUser: newTelegramUserInfo,
          },
        };
      });
    } catch (e) {
      console.log(e);
      throw new AppError(getErrorMessage(e));
    }
  };

  return {
    userData,
    loading,
    asyncUpsertWalletAddress,
    asyncUpdateProfileImageUrl,
    asyncUpdateEmail,
    asyncUpdateSocialTwitter,
    asyncUpdateRewardPoint,
    asyncDeleteWalletAddress,
    asyncUpdateSocialTelegram,
    asyncRemoveSocialTelegram,
  };
};

export { useSignedUserQuery };