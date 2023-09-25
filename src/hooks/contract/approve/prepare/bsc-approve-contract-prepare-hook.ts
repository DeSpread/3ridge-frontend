import { usePrepareContractWrite } from "wagmi";

export function useBscApproveContractPrepare({ amount }: { amount: number }) {
  const { config, error, isError, isSuccess } = usePrepareContractWrite({
    address: "0x55d398326f99059fF775485246999027B3197955",
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

  console.log("mainnet isSuccess", isSuccess);

  return {
    config,
    error,
    isError,
    isSuccess,
  };
}
