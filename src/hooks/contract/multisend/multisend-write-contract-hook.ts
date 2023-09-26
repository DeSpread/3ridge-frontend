import { useMemo } from "react";

import { ChainType } from "@/__generated__/graphql";
import { AppError } from "@/error/my-error";
import { useBscMultiSendContractPrepare } from "@/hooks/contract/multisend/prepare/bsc-multisend-contract-prepare-hook";
import { useBscTestnetMultiSendContractPrepare } from "@/hooks/contract/multisend/prepare/bsc-testnet-multisend-contract-prepare-hook";
import { useRunContractHook } from "@/hooks/contract/run-contract-hook";

export function useMultiSendWriteContractHook({
  chain,
  sender,
  recipients,
  amounts,
}: {
  chain: ChainType;
  sender?: `0x${string}`;
  recipients: `0x${string}`[];
  amounts: bigint[];
}) {
  const selectedContractPrepareHook = useMemo(() => {
    if (chain === ChainType.BnbTestnet)
      return useBscTestnetMultiSendContractPrepare;
    return useBscMultiSendContractPrepare;
  }, [chain]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: isPrepareSuccess,
  } = selectedContractPrepareHook({
    sender,
    recipients,
    amounts,
  });

  const {
    runContract: runContract_,
    error,
    isError,
    isSuccess,
    hash,
    isLoading,
  } = useRunContractHook(
    config,
    isPrepareError,
    prepareError,
    isPrepareSuccess,
  );

  return {
    runContract: () => {
      if (recipients.length !== amounts.length) {
        throw new AppError(
          "Contract arguments something wrong!!! - recipients, amounts array size must be equal",
        );
      }
      console.log(
        "sender",
        sender,
        "recipients",
        recipients,
        "amounts",
        amounts,
      );
      runContract_?.();
    },
    isPrepareSuccess,
    error,
    isError,
    hash,
    isLoading,
    isSuccess,
  };
}
