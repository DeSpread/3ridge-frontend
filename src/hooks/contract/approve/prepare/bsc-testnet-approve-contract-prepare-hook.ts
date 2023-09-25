import { usePrepareContractWrite } from "wagmi";

export function useBscTestNetApproveContractPrepare({
  amount,
}: {
  amount: number;
}) {
  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
    abi: [
      {
        constant: false,
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: ["0x81cDC3c61857ACCB4b9851A55910E2AF7FB4DDF1", BigInt(amount)],
    functionName: "approve",
  });

  console.log("testnet isSuccess", isSuccess);

  return {
    config,
    error,
    isError,
    isSuccess,
  };
}
