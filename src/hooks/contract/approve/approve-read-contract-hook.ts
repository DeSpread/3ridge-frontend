import { useMemo } from "react";

import { ChainType } from "@/__generated__/graphql";
import { useBscReadContract } from "@/hooks/contract/approve/read/bsc-read-contract-hook";
import { useBscTestNetReadContract } from "@/hooks/contract/approve/read/bsc-testnet-read-contract-hook";
import { useProxyReadContract } from "@/hooks/contract/approve/read/proxy-read-contract-hook";

export function useApproveReadContractHook({
  chain,
  userAddress,
}: {
  chain: ChainType;
  userAddress?: `0x${string}`;
}) {
  const selectedContractPrepareHook = useMemo(() => {
    if (!userAddress) return useProxyReadContract;
    if (chain === ChainType.BnbTestnet) return useBscTestNetReadContract;
    return useBscReadContract;
  }, [chain]);

  const { data, isError, isLoading, error, isSuccess } =
    selectedContractPrepareHook({ userAddress });

  console.log("useApproveReadContractHook - isSuccess: ", isSuccess);
  console.log("useApproveReadContractHook - error: ", error);
  console.log("useApproveReadContractHook - data", data);

  return { data };
}
