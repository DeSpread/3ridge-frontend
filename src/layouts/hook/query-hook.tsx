import { useLogin } from "../../provider/login/login-provider";
import { client } from "../../apollo/client";
import { useEffect, useState } from "react";
import { SignedUser } from "../../type";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_GMAIL,
  GET_USER_BY_WALLET_ADDRESS,
} from "../../apollo/query";

const useFindUserQuery = () => {
  const [data, setData] = useState<SignedUser>({});
  const [loading, setLoading] = useState(false);

  const {
    isGoogleLoggedIn,
    isMailLoggedIn,
    isWalletLoggedIn,
    mailLoginInfo,
    googleUserInfo,
    walletInfo,
  } = useLogin();

  useEffect(() => {
    if (isMailLoggedIn) {
      (async () => {
        try {
          setLoading(true);
          const res = await client.query({
            query: GET_USER_BY_EMAIL,
            variables: {
              email: mailLoginInfo.mail ?? "",
            },
          });
          const { email, name, profileImageUrl, wallet, _id } =
            res.data.userByEmail;
          setData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallet?.at(0)?.address,
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
              gmail: googleUserInfo.gmail ?? "",
            },
          });
          const { gmail, name, profileImageUrl, wallet, _id } =
            res.data.userByGmail;
          setData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: gmail ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallet?.at(0)?.address,
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
              walletAddress: walletInfo.address ?? "",
            },
          });
          const { email, name, profileImageUrl, wallet, _id } =
            res.data.userByWalletAddress;
          setData((prevState) => {
            return {
              ...prevState,
              _id: _id ?? undefined,
              email: email ?? undefined,
              name: name ?? undefined,
              profileImageUrl: profileImageUrl ?? undefined,
              walletAddress: wallet?.at(0)?.address,
            };
          });
        } catch (e) {
          setLoading(false);
        }
      })();
    }
  }, [isWalletLoggedIn]);

  return { data, loading };
};

export { useFindUserQuery };
