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
    args: ["0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa", BigInt(amount)],
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
