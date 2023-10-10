import { usePrepareContractWrite } from "wagmi";

import { ContractAddress } from "@/const";

export function useBscTestNetApproveContractPrepare({
  amount,
}: {
  amount: number;
}) {
  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: ContractAddress.BSC_TESTNET_USDT,
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
    args: [ContractAddress.BSC_TESTNET_MULTISEND, BigInt(amount)],
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
