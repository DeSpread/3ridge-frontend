import { useWallet as useAptosWallet } from "@aptos-labs/wallet-adapter-react";
import { openSignatureRequestPopup, SignatureData } from "@stacks/connect";
import { signMessage as signMessageByWagmi } from "@wagmi/core";

import { SupportedNetwork, SUPPORTED_NETWORKS } from "@/types";

export function useSignMessage() {
  const { signMessage: signMessageByAptos } = useAptosWallet();
  async function signMessage(
    network: SupportedNetwork,
    message: string,
    nonce: string,
  ): Promise<string | SignatureData> {
    if (network === SUPPORTED_NETWORKS.EVM) {
      return signMessageByWagmi({ message });
    }

    if (network === SUPPORTED_NETWORKS.APTOS) {
      const result = await signMessageByAptos({
        message,
        nonce: nonce,
      });

      if (!result) {
        throw new Error("failed sign message by aptos");
      }

      if (typeof result.signature === "string") {
        return result.signature;
      }

      return result.signature.join(",");
    }

    if (network === SUPPORTED_NETWORKS.STACKS) {
      return new Promise<SignatureData>((resolve, reject) => {
        openSignatureRequestPopup({
          message,
          onFinish(data) {
            resolve(data);
          },
          onCancel() {
            reject();
          },
        });
      });
    }

    throw new Error(`${network} is unsupported`);
  }

  return {
    signMessage,
  };
}
