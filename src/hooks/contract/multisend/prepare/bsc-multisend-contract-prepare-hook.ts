import { usePrepareContractWrite } from "wagmi";

export function useBscMultiSendContractPrepare({
  sender,
  recipients,
  amounts,
}: {
  sender?: `0x${string}`;
  recipients: `0x${string}`[];
  amounts: bigint[];
}) {
  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: "0xf638D1de7cCe47678830c928b337cd4D17a62917",
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
      "0x55d398326f99059fF775485246999027B3197955",
      sender ?? "0x55d398326f99059fF775485246999027B3197955",
      recipients,
      amounts,
    ],
    functionName: "multiSend",
  });

  console.log("mainnet isSuccess", isSuccess);

  return {
    config,
    error,
    isError,
    isSuccess,
  };
}
