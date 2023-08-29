//export function useAdminQuery(userId?: string) {
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { ContractInfo } from "../types";
import { useMemo, useState } from "react";
import { AppError } from "../error/my-error";

export function useContractHook(props: { contractInfo?: ContractInfo }) {
  const { contractInfo } = props;

  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  const {
    chains: switchChains,
    error: switchError,
    isLoading: isSwitchLoading,
    pendingChainId,
    switchNetwork,
    switchNetworkAsync,
  } = useSwitchNetwork();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    isSuccess: isPrepareSuccess,
  } = usePrepareContractWrite({
    address: contractInfo?.address ?? undefined,
    abi: contractInfo?.abi,
    // @ts-ignore
    functionName: contractInfo?.functionName,
  });

  const { data, error, isError, write, isSuccess } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    timeout: 10_000,
    confirmations: 5,
  });

  const runContract = () => {
    write?.();
  };

  const isFinish = useMemo(() => {
    return !isLoading && !isError && data?.hash && isSuccess;
  }, [isLoading, isError, isSuccess, data?.hash]);

  return {
    runContract: !isPrepareSuccess
      ? () => {
          throw new AppError("Contract Prepare Not Yet");
        }
      : runContract,
    hash: data?.hash,
    isLoading,
    isFinish,
    error,
    chain,
    switchNetwork,
    switchNetworkAsync,
  };
}
