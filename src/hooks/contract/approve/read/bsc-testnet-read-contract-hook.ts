import { useContractRead } from "wagmi";

export function useBscTestNetReadContract({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) {
  const CONTRACT_ADDRESS = "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd";

  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: [
      {
        constant: true,
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
    ],
    args: [
      userAddress ?? "0x1A28b29107fF10d28760c12b24a2e06d98054389",
      "0x81cDC3c61857ACCB4b9851A55910E2AF7FB4DDF1",
    ],
    functionName: "allowance",
  });

  return {
    data,
    isError,
    isLoading,
    error,
    isSuccess,
  };
}
