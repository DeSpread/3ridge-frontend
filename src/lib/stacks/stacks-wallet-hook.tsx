import {
  AppConfig,
  showConnect,
  UserSession,
  getUserData,
  isStacksWalletInstalled,
} from "@stacks/connect";
import {
  createStacksPrivateKey,
  getPublicKey,
  addressFromPublicKeys,
  AddressVersion,
  AddressHashMode,
  addressToString,
} from "@stacks/transactions";
import { useEffect, useState } from "react";
import { callWithRetry } from "../../util/retry-backoff";

function getStacksAccount(appPrivateKey: string) {
  const privateKey = createStacksPrivateKey(appPrivateKey);
  const publicKey = getPublicKey(privateKey);
  const address = addressFromPublicKeys(
    AddressVersion.MainnetSingleSig,
    AddressHashMode.SerializeP2PKH,
    1,
    [publicKey]
  );
  return { privateKey, address };
}

const useStacksWallet = () => {
  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });
  const [ownerStxAddress, setOwnerStxAddress] = useState<string>();
  const [appStxAddress, setAppStxAddress] = useState<string>();
  const isWalletInstalled = true;

  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      callWithRetry(async () => {
        return getUserData(userSession);
      }).then((userData) => {
        const { address } = getStacksAccount(userData.appPrivateKey);
        setAppStxAddress(addressToString(address));
        setOwnerStxAddress(userData.profile.stxAddress["mainnet"]);
      });
    }
  }, [userSession]);

  const connect = () => {
    showConnect({
      appDetails: {
        name: "Stacks Next.js Starter",
        icon: "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/favicon.ico",
      },
      redirectTo: "/",
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  function disconnect() {
    userSession.signUserOut("/");
  }

  return {
    connect,
    ownerStxAddress,
    appStxAddress,
    disconnect,
    isWalletInstalled,
    userSession,
  };
};

export { useStacksWallet };
