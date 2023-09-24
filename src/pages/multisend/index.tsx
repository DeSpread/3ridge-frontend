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
import React, { useState } from "react";
import { useNetwork } from "wagmi";

import { ChainType } from "../../__generated__/graphql";
import NumberInput from "../../components/atomic/atoms/number-input";
import SecondaryButton from "../../components/atomic/atoms/secondary-button";
import ValidatedTextInput from "../../components/atomic/molecules/validated-text-input";
import MathUtil from "../../util/math-util";
import StringUtil from "../../util/string-util";

import { useApproveContractHook } from "@/hooks/contract/approve/approve-contract-hook";

enum TokenType {
  USDT = "USDT",
  USDC = "USDC",
}

const MultiSend = () => {
  const theme = useTheme();
  const [addresses, setAddresses] = useState<`0x${string}`[] | string[]>([""]);
  const [chainType, setChainType] = useState<ChainType>(ChainType.Bnb);
  const [tokenType, setTokenType] = useState<TokenType>(TokenType.USDT);
  const [amountValue, setAmountValue] = useState(1);
  const { chain: networkChain } = useNetwork();

  const {
    runContract,
    isPrepareSuccess,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useApproveContractHook({ chain: chainType, amount: 1000 });

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
                  onChange={(e) => {
                    const { value } = e.target;
                    const chainType = value as ChainType;
                    setChainType(chainType);
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
                  {/*<MenuItem value={TokenType.USDC}>USDC</MenuItem>*/}
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
                runContract();
                // const res = addresses.reduce(
                //   (previousValue, currentValue) =>
                //     previousValue &&
                //     StringUtil.isValidEthereumAddress(currentValue),
                //   true
                // );
                // if (!res) {
                //   showAlert({
                //     title: "오류",
                //     content: "EVM Address에 오류가 있습니다",
                //   });
                //   return;
                // }
              }}
            >
              보내기
            </SecondaryButton>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
};

export default MultiSend;
