import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useMemo, useState } from "react";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import Web3 from "web3";

import { ChainType } from "../../__generated__/graphql";
import NumberInput from "../../components/atomic/atoms/number-input";
import SecondaryButton from "../../components/atomic/atoms/secondary-button";
import ValidatedTextInput from "../../components/atomic/molecules/validated-text-input";
import MathUtil from "../../util/math-util";
import StringUtil from "../../util/string-util";

import ContractLoadingDialog from "@/components/dialogs/contract-loading-dialog";
import { getErrorMessage, getLocaleErrorMessage } from "@/error/my-error";
import StringHelper from "@/helper/string-helper";
import TypeHelper from "@/helper/type-helper";
import { useApproveReadContractHook } from "@/hooks/contract/approve/approve-read-contract-hook";
import { useApproveWriteContractHook } from "@/hooks/contract/approve/approve-write-contract-hook";
import { useMultiSendWriteContractHook } from "@/hooks/contract/multisend/multisend-write-contract-hook";
import { useAlert } from "@/provider/alert/alert-provider";
import { useLoading } from "@/provider/loading/loading-provider";
import { TokenType } from "@/types";
import Web3Util from "@/util/web3-util";

const MultiSend = () => {
  const theme = useTheme();
  const [addresses, setAddresses] = useState<`0x${string}`[] | string[]>([""]);
  const [chainType, setChainType] = useState<ChainType>(ChainType.BnbTestnet);
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.USDT);
  const [amountValue, setAmountValue] = useState(1);
  const { showLoading, closeLoading } = useLoading();
  const { showAlert } = useAlert();
  const { chain: connectedChain } = useNetwork();
  const {
    chains: switchChains,
    error: switchError,
    isLoading: isSwitchLoading,
    switchNetwork,
  } = useSwitchNetwork();
  const { address: userAddress, isConnected } = useAccount();

  const isChainConnected = useMemo(() => {
    return TypeHelper.convertChainTypeToId(chainType) === connectedChain?.id;
  }, [chainType, connectedChain]);

  const {
    runContract: runApproveContract,
    isPrepareSuccess,
    isLoading,
    isSuccess,
    isError,
    error,
    hash,
  } = useApproveWriteContractHook({ chain: chainType, amount: 1000 });

  console.log("isLoading", isLoading, "isSuccess", isSuccess);

  const openLoadingDialog = useMemo(() => {
    return isLoading;
  }, [isLoading]);

  const recipients: `0x${string}`[] = useMemo(() => {
    return (
      addresses?.filter((e) => /^0x/i.test(e)).map((e) => e as `0x${string}`) ??
      []
    );
  }, [addresses]);

  const { runContract: runMultiSendContract } = useMultiSendWriteContractHook({
    chain: chainType,
    sender: userAddress,
    recipients,
    amounts: [BigInt(1000)],
  });

  const { data: allowanceAmount } = useApproveReadContractHook({
    chain: chainType,
    userAddress,
  });

  console.log("allowanceAmount", allowanceAmount);

  const isApproved = useMemo(() => {
    if (allowanceAmount === BigInt(0)) {
      return false;
    }
    return true;
  }, [allowanceAmount]);

  const buttonLabel = useMemo(() => {
    if (!isChainConnected) {
      return "선택한 체인으로 연결하기";
    }
    return isApproved ? "보내기" : "승인하기";
  }, [isChainConnected, isApproved]);

  return (
    <>
      <Stack sx={{ width: "100%" }} alignItems={"center"}>
        <Card sx={{ maxWidth: 1200, minWidth: 800, marginTop: 4 }}>
          <CardContent>
            <Stack sx={{ width: "100%", background: "" }} alignItems={"center"}>
              <Typography variant={"h5"}>EVM MutiSender</Typography>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Stack direction={"row"} spacing={1}>
              <FormControl>
                <InputLabel>체인</InputLabel>
                <Select
                  value={chainType}
                  label="체인 선택"
                  onChange={async (e) => {
                    const { value } = e.target;
                    const chainType = value as ChainType;
                    const chainId = TypeHelper.convertChainTypeToId(chainType);
                    if (chainId === -1) {
                      return;
                    }
                    showLoading();
                    switchNetwork?.(chainId);
                    // await switchNetworkAsync?.(chainId);
                    setChainType(chainType);
                    closeLoading();
                  }}
                  sx={{ width: 120, background: "" }}
                >
                  <MenuItem value={ChainType.BnbTestnet}>BnbTestnet</MenuItem>
                  <MenuItem value={ChainType.Bnb}>Bnb</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel>토큰</InputLabel>
                <Select
                  value={tokenType}
                  label="토큰"
                  onChange={(e) => {
                    const { value } = e.target;
                    const tokenType = value as TokenType;
                    setTokenType(tokenType);
                  }}
                  sx={{ width: 120, background: "" }}
                >
                  <MenuItem value={TokenType.USDT}>USDT</MenuItem>
                </Select>
              </FormControl>
              <Box>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ marginLeft: 2 }}
                >
                  <Box>
                    <Typography variant={"body2"}>토큰수</Typography>
                  </Box>
                  <NumberInput
                    sx={{ marginLeft: 2 }}
                    value={amountValue}
                    onChange={(e) => {
                      const value = MathUtil.clamp(parseInt(e.target.value), 1);
                      setAmountValue(value);
                    }}
                  ></NumberInput>
                </Stack>
              </Box>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Stack spacing={1}>
              {addresses &&
                addresses.map((e, i) => {
                  return (
                    <Stack
                      key={`${i}`}
                      sx={{ background: "" }}
                      direction={"row"}
                      alignItems={"center"}
                    >
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"flex-start"}
                        sx={{ width: "100%" }}
                      >
                        <Box sx={{ minWidth: 100 }}>
                          <Typography variant={"body2"}>
                            {`주소 ${i + 1} 번째`}
                          </Typography>
                        </Box>
                        <ValidatedTextInput
                          fullWidth
                          isValid={StringUtil.isValidEthereumAddress(e)}
                          onChange={(e) => {
                            const { value } = e.target;
                            setAddresses((prevState) => {
                              const src = [...prevState];
                              src[i] = value;
                              return [...src];
                            });
                          }}
                        />
                      </Stack>
                      <IconButton
                        className={"MuiIconButton"}
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: 16,
                          borderWidth: 2,
                          borderStyle: "solid",
                          marginLeft: 3,
                        }}
                        onClick={(e) => {
                          setAddresses((prevState) => {
                            const src = [...prevState];
                            src.splice(i, 1);
                            return [...src];
                          });
                        }}
                      >
                        <RemoveIcon
                          fontSize={"medium"}
                          sx={{
                            borderRadius: 30,
                            "&:hover": {
                              borderColor: theme.palette.secondary.main,
                              background: "#61E1FF55",
                            },
                          }}
                        ></RemoveIcon>
                      </IconButton>
                    </Stack>
                  );
                })}
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                sx={{ width: "100%", paddingTop: 2 }}
              >
                <IconButton
                  className={"MuiIconButton"}
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderStyle: "solid",
                  }}
                  onClick={(e) => {
                    setAddresses((prevState) => {
                      const src = [...prevState, ""];
                      return [...src];
                    });
                  }}
                >
                  <AddIcon
                    fontSize={"medium"}
                    sx={{
                      borderRadius: 30,
                      "&:hover": {
                        borderColor: theme.palette.secondary.main,
                        background: "#61E1FF55",
                      },
                    }}
                  ></AddIcon>
                </IconButton>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <SecondaryButton
              fullWidth={true}
              onClick={async (e) => {
                try {
                  if (!isChainConnected) {
                    const chainId = TypeHelper.convertChainTypeToId(chainType);
                    if (chainId === -1) {
                      return;
                    }
                    switchNetwork?.(chainId);
                    return;
                  }
                  if (isApproved) await runMultiSendContract();
                  else await runApproveContract();
                } catch (e) {
                  const errorMessage = getLocaleErrorMessage(e);
                  showAlert({ title: "알림", content: errorMessage });
                }
              }}
              suppressHydrationWarning
            >
              {buttonLabel}
            </SecondaryButton>
          </CardContent>
        </Card>
      </Stack>
      <ContractLoadingDialog
        open={openLoadingDialog}
        title={"컨트랙트를 실행중입니다"}
        link={StringHelper.makeExplorerLink(chainType, hash)}
        linkName={"트랜잭션 확인하기"}
      ></ContractLoadingDialog>
    </>
  );
};

export default MultiSend;
