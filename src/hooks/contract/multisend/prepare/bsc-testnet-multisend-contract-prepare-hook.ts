import { usePrepareContractWrite } from "wagmi";

export function useBscTestnetMultiSendContractPrepare({
  sender,
  recipients,
  amounts,
}: {
  sender?: `0x${string}`;
  recipients: `0x${string}`[];
  amounts: bigint[];
}) {
  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: "0x81cDC3c61857ACCB4b9851A55910E2AF7FB4DDF1",
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
      "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
      sender ?? "0x81cDC3c61857ACCB4b9851A55910E2AF7FB4DDF1",
      recipients,
      amounts,
    ],
    functionName: "multiSend",
  });

  console.log("testnet isSuccess", isSuccess);

  return {
    config,
    error,
    isError,
    isSuccess,
  };
}
