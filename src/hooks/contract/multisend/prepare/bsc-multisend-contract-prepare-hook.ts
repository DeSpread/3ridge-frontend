import { useMemo } from "react";
import { usePrepareContractWrite } from "wagmi";

import { ContractAddress } from "@/const";

export function useBscMultiSendContractPrepare({
  sender,
  recipients,
  amounts,
}: {
  sender?: `0x${string}`;
  recipients: `0x${string}`[];
  amounts: bigint[];
}) {
  const enabled = useMemo(() => {
    if (
      recipients?.length == 0 ||
      amounts?.length === 0 ||
      recipients?.length !== amounts?.length
    ) {
      return false;
    }
    for (let i = 0; i < recipients.length; i++) {
      const addr = recipients[i];
      if (/^0x/i.test(addr) === false) return false;
    }
    return true;
  }, [recipients, amounts]);

  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: ContractAddress.BSC_MAINNET_MULTISEND,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "recipients",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        name: "multiSend",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: [
      ContractAddress.BSC_MAINNET_USDT,
      "0x1A28b29107fF10d28760c12b24a2e06d98054389",
      recipients,
      amounts,
    ],
    functionName: "multiSend",
    enabled,
  });

  console.log("mainnet enabled", enabled);
  console.log("mainnet isSuccess", isSuccess);

  return {
    config,
    error,
    isError,
    isSuccess,
  };
}
