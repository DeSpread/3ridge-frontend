import { useMemo } from "react";
import { useContractWrite, useWaitForTransaction } from "wagmi";

import { ChainType } from "@/__generated__/graphql";
import { AppError } from "@/error/my-error";
import { useBscApproveContractPrepare } from "@/hooks/contract/approve/prepare/bsc-approve-contract-prepare-hook";
import { useBscTestNetApproveContractPrepare } from "@/hooks/contract/approve/prepare/bsc-testnet-approve-contract-prepare-hook";
import { useRunContractHook } from "@/hooks/contract/run-contract-hook";

export function useApproveWriteContractHook({
  chain,
  amount,
}: {
  chain: ChainType;
  amount: number;
}) {
  const selectedContractPrepareHook = useMemo(() => {
    if (chain === ChainType.BnbTestnet)
      return useBscTestNetApproveContractPrepare;
    return useBscApproveContractPrepare;
  }, [chain]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: isPrepareSuccess,
  } = selectedContractPrepareHook({ amount });

  const { runContract, error, isError, isSuccess, hash, isLoading } =
    useRunContractHook(config, isPrepareError, prepareError, isPrepareSuccess);

  return {
    runContract,
    isPrepareSuccess,
    error,
    isError,
    hash,
    isLoading,
    isSuccess,
  };
  // const {
  //   data,
  //   error: writeError,
  //   isError: isWriteError,
  //   write,
  //   isSuccess: isWriteSuccess,
  // } = useContractWrite(config);
  //
  // const { isLoading } = useWaitForTransaction({
  //   hash: data?.hash,
  //   timeout: 10_000,
  //   confirmations: 5,
  // });
  //
  // const hash = useMemo(() => {
  //   return data?.hash;
  // }, [data]);
  //
  // const error = useMemo(() => {
  //   if (prepareError) return prepareError;
  //   if (writeError) return writeError;
  //   return undefined;
  // }, [prepareError, writeError]);
  //
  // const isError = useMemo(() => {
  //   return isPrepareError || isWriteError;
  // }, [isPrepareError, isWriteError]);
  //
  // const isSuccess = useMemo(() => {
  //   return isPrepareSuccess && isWriteSuccess;
  // }, [isPrepareSuccess, isWriteSuccess]);
  //
  // const runContract = () => {
  //   write?.();
  // };
  //
  // return {
  //   runContract: !isPrepareSuccess
  //     ? () => {
  //         throw new AppError("Contract Prepare Not Yet");
  //       }
  //     : runContract,
  //   isPrepareSuccess,
  //   error,
  //   isError,
  //   hash,
  //   isLoading,
  //   isSuccess,
  // };
}
