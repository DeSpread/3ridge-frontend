import { useContractRead } from "wagmi";

export function useBscReadContract({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) {
  const CONTRACT_ADDRESS = "0x55d398326f99059fF775485246999027B3197955";

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
      "0xf638D1de7cCe47678830c928b337cd4D17a62917",
    ],
    functionName: "allowance",
    watch: true,
  });

  return {
    data,
    isError,
    isLoading,
    error,
    isSuccess,
  };
}
