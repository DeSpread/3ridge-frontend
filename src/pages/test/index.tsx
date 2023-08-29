import React from "react";
import PrimaryButton from "../../components/atomic/atoms/primary-button";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const useContract = (address?: string) => {
  if (!address) {
    return {
      mint: () => {},
    };
  }
};

const Test = () => {
  const { isConnected } = useAccount();

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x0C0755321bD2a7573069C92e1ABA195Df077dc92",
    abi: [
      {
        inputs: [],
        name: "mintBadge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "mintBadge",
  });

  const { data, error, isError, write, isSuccess } = useContractWrite(config);

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    timeout: 10_000,
    confirmations: 5,
  });

  console.log(
    "isSuccess",
    isSuccess,
    "data",
    data,
    "isError",
    isError,
    "isLoading",
    isLoading
  );

  return (
    <>
      {isConnected && (
        <div>
          <PrimaryButton
            disabled={!write || isLoading}
            onClick={() => write?.()}
          >
            {isLoading ? "Minting..." : "Mint"}
          </PrimaryButton>
          {isSuccess && (
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
                  Polygonscan
                </a>
              </div>
            </div>
          )}
          {(isPrepareError || isError) && (
            <div>Error: {(prepareError || error)?.message}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Test;
