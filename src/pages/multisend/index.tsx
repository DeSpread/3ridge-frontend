import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { InjectedConnector as EvmInjectedConnector } from "@wagmi/connectors/injected";
import React, { useMemo, useState } from "react";
import {
  useAccount,
  useConnect as useEvmConnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

import { ChainType } from "../../__generated__/graphql";
import NumberInput from "../../components/atomic/atoms/number-input";
import SecondaryButton from "../../components/atomic/atoms/secondary-button";
import ValidatedTextInput from "../../components/atomic/molecules/validated-text-input";
import MathUtil from "../../util/math-util";
import StringUtil from "../../util/string-util";

import ConnectLightCircle from "@/components/atomic/atoms/connect-light-circle";
import PrimaryButton from "@/components/atomic/atoms/primary-button";
import InputButton from "@/components/atomic/molecules/input-button";
import ConfirmAlertDialog from "@/components/dialogs/confirm-alert-dialog";
import ContractLoadingDialog from "@/components/dialogs/contract-loading-dialog";
import { getLocaleErrorMessage } from "@/error/my-error";
import StringHelper from "@/helper/string-helper";
import TypeHelper from "@/helper/type-helper";
import WithLoginRequiredContainer from "@/hoc/with-login-required-container";
import { useApproveReadContractHook } from "@/hooks/contract/approve/approve-read-contract-hook";
import { useApproveWriteContractHook } from "@/hooks/contract/approve/approve-write-contract-hook";
import { useMultiSendWriteContractHook } from "@/hooks/contract/multisend/multisend-write-contract-hook";
import { useAlert } from "@/provider/alert/alert-provider";
import { useLoading } from "@/provider/loading/loading-provider";
import { TokenType } from "@/types";
import FileUtil from "@/util/file-util";
import Web3Util from "@/util/web3-util";

const MultiSend = () => {
  const TEST_RATIO = 1;

  const theme = useTheme();
  const [addresses, setAddresses] = useState<`0x${string}`[] | string[]>([""]);
  const [chainType, setChainType] = useState<ChainType>(ChainType.Bnb);
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.USDT);
  const [amountValue, setAmountValue] = useState(1);
  const [requestTokenAmountValue, setRequestTokenAmountValue] = useState(1);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

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
  const {
    connect: evmConnect,
    connectors: evmConnectors,
    status: evmConnectStatus,
  } = useEvmConnect({
    connector: new EvmInjectedConnector(),
  });

  const isChainConnected = useMemo(() => {
    return TypeHelper.convertChainTypeToId(chainType) === connectedChain?.id;
  }, [chainType, connectedChain]);

  const approvedAmount = useMemo(() => {
    return (
      parseFloat(Web3Util.etherToWei(requestTokenAmountValue)) * TEST_RATIO
    );
  }, [requestTokenAmountValue]);

  const {
    runContract: runApproveContract,
    isPrepareSuccess: isApprovePrepareSuccess,
    isLoading: isApproveLoading,
    isSuccess,
    isError,
    error,
    hash: approveHash,
  } = useApproveWriteContractHook({
    chain: chainType,
    amount: approvedAmount,
  });

  const showApproveConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const closeApproveConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const recipients: `0x${string}`[] = useMemo(() => {
    return (
      addresses?.filter((e) => /^0x/i.test(e)).map((e) => e as `0x${string}`) ??
      []
    );
  }, [addresses]);

  const getMultiSendAmounts = () => {
    const _amount = BigInt(
      parseFloat(Web3Util.etherToWei(amountValue)) * TEST_RATIO,
    );
    return Array.from({ length: addresses.length ?? 0 }, () => _amount);
  };

  const getTotalMultiSendAmounts = () => {
    return getMultiSendAmounts().reduce((prev, cur, index) => {
      return prev + cur;
    }, BigInt(0));
  };

  console.log("getTotalMultiSendAmounts - ", getTotalMultiSendAmounts());

  const {
    runContract: runMultiSendContract,
    isLoading: isMultiSendLoading,
    isPrepareSuccess: isMultiSendPrepareSuccess,
    hash: multiSendHash,
  } = useMultiSendWriteContractHook({
    chain: chainType,
    sender: userAddress,
    recipients,
    amounts: getMultiSendAmounts(),
  });

  const hash = useMemo(() => {
    if (approveHash) return approveHash;
    if (multiSendHash) return multiSendHash;
    return undefined;
  }, [approveHash, multiSendHash]);

  const openLoadingDialog = useMemo(() => {
    return (
      (isApproveLoading && isApprovePrepareSuccess) ||
      (isMultiSendLoading && isMultiSendPrepareSuccess)
    );
  }, [
    isApprovePrepareSuccess,
    isMultiSendPrepareSuccess,
    isApproveLoading,
    isMultiSendLoading,
  ]);

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
    return "보내기";
  }, [isChainConnected]);

  const asyncImportFile = async (file: File) => {
    showLoading();
    const text = await FileUtil.asyncReadAsText(file);
    const rows = text.split("\n");
    const srcAddresses: `0x${string}`[] | string[] = [];
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split(",");
      if (columns.length > 0 && columns[0] && /^0x/i.test(columns[0])) {
        srcAddresses.push(columns[0] as `0x${string}`);
      }
    }
    const target = [...srcAddresses];
    setAddresses(target);
    closeLoading();
  };

  return (
    <>
      <Stack sx={{ width: "100%" }} alignItems={"center"}>
        <Card sx={{ maxWidth: 1200, minWidth: 800, marginTop: 4 }}>
          <CardContent>
            <Grid container direction={"row"} alignItems={"center"}>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Stack alignItems={"center"}>
                  <Typography variant={"h5"}>EVM MultiSender</Typography>
                </Stack>
              </Grid>
              <Grid item xs={4}>
                <Stack
                  alignItems={"flex-end"}
                  justifyContent={"center"}
                  sx={{ background: "" }}
                >
                  <ConnectLightCircle
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: 16,
                    }}
                    isConnected={isConnected}
                    onClick={() => {
                      if (!isConnected) {
                        const connectors = evmConnectors.filter(
                          (e) => e.name === "MetaMask",
                        );
                        const connector = connectors[0];
                        evmConnect({ connector });
                      }
                    }}
                  ></ConnectLightCircle>
                </Stack>
              </Grid>
            </Grid>
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
              <Typography>컨트랙트 준비 상태</Typography>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  maxWidth: 300,
                }}
              >
                <Typography>ApproveContract</Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  {isApproveLoading && (
                    <CircularProgress
                      sx={{ color: "white" }}
                      size={"1rem"}
                    ></CircularProgress>
                  )}
                  <ConnectLightCircle
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: 16,
                    }}
                    isConnected={isApprovePrepareSuccess}
                  ></ConnectLightCircle>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{
                  maxWidth: 300,
                }}
              >
                <Typography>MultiSendContract</Typography>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <ConnectLightCircle
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: 16,
                    }}
                    isConnected={isMultiSendPrepareSuccess}
                  ></ConnectLightCircle>
                  {isMultiSendLoading && (
                    <CircularProgress
                      sx={{ color: "white" }}
                      size={"1rem"}
                    ></CircularProgress>
                  )}
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ marginLeft: 0 }}
              >
                <Box>
                  <Typography>토큰 허용량</Typography>
                </Box>
                <NumberInput
                  sx={{ marginLeft: 4 }}
                  value={requestTokenAmountValue}
                  onChange={(e) => {
                    if (isNaN(parseInt(e.target.value))) {
                      // console.log("aa", parseInt(e.target.value));
                      return;
                    }
                    const value = MathUtil.clamp(parseInt(e.target.value), 1);
                    setRequestTokenAmountValue(value);
                  }}
                ></NumberInput>
                <PrimaryButton
                  onClick={async () => {
                    showLoading();
                    // console.log(requestTokenAmountValue);
                    await runApproveContract();
                    closeLoading();
                  }}
                  sx={{ marginLeft: 2 }}
                >
                  승인하기
                </PrimaryButton>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                  maxWidth: 384,
                }}
                spacing={1}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography>{`현재`}</Typography>
                  <Typography>{`허용된`}</Typography>
                  <Typography>{`토큰량`}</Typography>
                </Stack>
                <Stack spacing={1} direction={"row"}>
                  <Typography suppressHydrationWarning>
                    {/*{StringUtil.removeTrailingZeros(*/}
                    {Web3Util.weiToEther(allowanceAmount)}
                    {/*)}*/}
                  </Typography>
                  <Typography>USDT</Typography>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                  maxWidth: 384,
                }}
                spacing={1}
              >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography>{`보내는`}</Typography>
                  <Typography>{`토큰량`}</Typography>
                </Stack>
                <Stack spacing={1} direction={"row"}>
                  <Typography suppressHydrationWarning>
                    {`${Web3Util.weiToEther(getTotalMultiSendAmounts())}`}
                  </Typography>
                  <Typography>USDT</Typography>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ marginTop: 3, marginBottom: 4 }}></Divider>
            <Stack spacing={2}>
              <div style={{ position: "relative" }}>
                <Stack direction={"row"} spacing={1}>
                  <Typography>주소 CSV File 업로드</Typography>
                  <UploadFileIcon></UploadFileIcon>
                </Stack>
                <InputButton
                  sx={{
                    top: -4,
                    left: -4,
                    width: 178,
                    height: 32,
                    position: "absolute",
                    ":hover": {
                      background: "rgba(255, 255, 255, 0.08)",
                    },
                  }}
                  filterReg={/(csv)$/i}
                  onChanged={async (file: File) => {
                    // console.log(file);
                    await asyncImportFile(file);
                  }}
                  onError={(error) => {
                    showAlert({
                      title: "알림",
                      content: "파일 포맷이 csv인지 확인해주세요",
                    });
                  }}
                ></InputButton>
              </div>
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
                          value={e}
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
                          visibility: i === 0 ? "hidden" : "visible",
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
              disabled={!isConnected}
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
                  if (
                    getTotalMultiSendAmounts() > (allowanceAmount ?? BigInt(0))
                  ) {
                    showAlert({
                      title: "알림",
                      content: "토큰 허용량이 부족합니다",
                    });
                    return;
                  }
                  await runMultiSendContract();
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
      <ConfirmAlertDialog
        title={"알림"}
        open={openConfirmDialog}
        onClose={() => {
          closeApproveConfirmDialog();
        }}
        onCloseBtnClicked={(e) => {
          closeApproveConfirmDialog();
        }}
        onConfirmBtnClicked={async (e) => {
          await runApproveContract();
          closeApproveConfirmDialog();
        }}
        onCancelBtnClicked={(e) => {
          closeApproveConfirmDialog();
        }}
      >
        <Stack>
          <Typography>
            {(addresses?.length ?? 0) * amountValue * TEST_RATIO} USDT만큼
            Approve 하시나요?
          </Typography>
        </Stack>
      </ConfirmAlertDialog>
    </>
  );
};

export default WithLoginRequiredContainer(MultiSend);
