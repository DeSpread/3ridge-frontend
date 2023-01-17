import { useLogin } from "../provider/login/login-provider";
import { client } from "../apollo/client";
import { useEffect, useState } from "react";
import { SignedUser } from "../type";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_GMAIL,
  GET_USER_BY_WALLET_ADDRESS,
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

const useSignedUserQuery = () => {
  const { connectAsync, connectors } = useConnect();
  const [UpdateUserByName] = useMutation(UPDATE_USER_WALLET_BY_NAME);

  const [userData, setUserData] = useState<SignedUser>({});
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
          const res = await client.query({
            query: GET_USER_BY_EMAIL,
            variables: {
              email: emailLoggedInInfo.mail ?? "",
            },
          });
          const { email, name, profileImageUrl, wallets, _id } =
            res.data.userByEmail;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
            };
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      })();
    }
  }, [isMailLoggedIn]);

  useEffect(() => {
    if (isGoogleLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          const res = await client.query({
            query: GET_USER_BY_GMAIL,
            variables: {
              gmail: googleLoggedInInfo.gmail ?? "",
            },
          });
          const { gmail, name, profileImageUrl, wallets, _id } =
            res.data.userByGmail;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: gmail ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
            };
          });
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      })();
    }
  }, [isGoogleLoggedIn]);

  useEffect(() => {
    if (isWalletLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          const res = await client.query({
            query: GET_USER_BY_WALLET_ADDRESS,
            variables: {
              walletAddress: walletLoggedInInfo.address ?? "",
            },
          });
          const { email, name, profileImageUrl, wallets, _id } =
            res.data.userByWalletAddress;
          setUserData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallets?.at(0)?.address,
            };
          });
        } catch (e) {
          setLoading(false);
        }
      })();
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
      await UpdateUserByName({
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
      await UpdateUserByName({
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

  const asyncUpdateEmail = async (email: string) => {
    try {
      if (!userData.name) return;
      // await updateUserByName({
      //   variables: {
      //     name: userData.name
      //   }
      // });
    } catch (e) {}
  };

  return {
    userData,
    loading,
    asyncUpdateWalletAddressByWallet,
    asyncUpdateWalletAddress,
  };
};

export { useSignedUserQuery };
