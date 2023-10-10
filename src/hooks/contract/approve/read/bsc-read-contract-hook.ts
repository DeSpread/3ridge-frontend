import { useMemo } from "react";
import { useContractRead } from "wagmi";

import { ContractAddress } from "@/const";

export function useBscReadContract({
  userAddress,
}: {
  userAddress?: `0x${string}`;
}) {
  const enabled = useMemo(() => {
    return userAddress && /^0x/i.test(userAddress) ? true : false;
  }, [userAddress]);

  const { data, isError, isLoading, error, isSuccess } = useContractRead({
    address: ContractAddress.BSC_MAINNET_USDT,
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
      ContractAddress.BSC_MAINNET_MULTISEND,
    ],
    functionName: "allowance",
    watch: true,
    enabled,
  });

  return {
    data,
    isError,
    isLoading,
    error,
    isSuccess,
  };
}
