import { WriteContractMode } from "@wagmi/core";
import { Abi } from "abitype/src/abi";
import { useMemo } from "react";
import {
  useContractWrite,
  UseContractWriteConfig,
  useWaitForTransaction,
} from "wagmi";

import { AppError } from "@/error/my-error";

export function useRunContractHook<
  TAbi extends Abi | readonly unknown[],
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: UseContractWriteConfig<TAbi, TFunctionName, TMode>,
  isPrepareError: boolean,
  prepareError: Error | null,
  isPrepareSuccess: boolean,
) {
  const {
    data,
    error: writeError,
    isError: isWriteError,
    write,
    isSuccess: isWriteSuccess,
  } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    timeout: 10_000,
    confirmations: 5,
  });

  const hash = useMemo(() => {
    return data?.hash;
  }, [data]);

  const error = useMemo(() => {
    if (prepareError) return prepareError;
    if (writeError) return writeError;
    return undefined;
  }, [prepareError, writeError]);

  const isError = useMemo(() => {
    return isPrepareError || isWriteError;
  }, [isPrepareError, isWriteError]);

  const isSuccess = useMemo(() => {
    return isPrepareSuccess && isWriteSuccess;
  }, [isPrepareSuccess, isWriteSuccess]);

  const runContract = () => {
    write?.();
  };

  return {
    runContract: !isPrepareSuccess
      ? () => {
          throw new AppError("Contract Prepare Not Yet");
        }
      : runContract,
    error,
    isError,
    hash,
    isLoading,
    isSuccess,
  };
}
