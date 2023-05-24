import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SecondaryButton from "../../../components/atoms/secondary-button";
import Image from "next/image";
import AptosIcon from "../../../components/atoms/svg/aptos-icon";
import { SUPPORTED_NETWORKS, SupportedNetwork } from "../../../type";

type SignInWithWalletDialogProps = SignDialogProps & {
  onNetworkButtonClicked: (network: SupportedNetwork) => void;
};

const SignInWithNetworkSelectDialog = (props: SignInWithWalletDialogProps) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.APTOS);
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            sx={{ width: 120, background: "" }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <AptosIcon width={24} height={24}></AptosIcon>
            <Typography variant={"body2"} className={"MuiTypography"}>
              APTOS
            </Typography>
          </Stack>
        </Stack>
      </SecondaryButton>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.SUI);
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            sx={{ width: 120, background: "" }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Image
              src={
                "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/sui-icon.svg"
              }
              alt={"sui"}
              width={24}
              height={24}
            ></Image>
            <Typography variant={"body2"} className={"MuiTypography"}>
              SUI
            </Typography>
          </Stack>
        </Stack>
      </SecondaryButton>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.EVM);
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            sx={{ width: 120, background: "" }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Image
              src={
                "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/Ethereum-Icon-Purple-Logo.wine.svg"
              }
              alt={"ethereum"}
              width={24}
              height={24}
              style={{ background: "white", borderRadius: 24 }}
            ></Image>
            <Typography variant={"body2"} className={"MuiTypography"}>
              ETHEREUM
            </Typography>
          </Stack>
        </Stack>
      </SecondaryButton>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.STACKS);
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack
            sx={{ width: 120, background: "" }}
            direction={"row"}
            alignItems={"center"}
            spacing={1}
          >
            <Image
              src={
                "https://3ridge.s3.ap-northeast-2.amazonaws.com/icon/stacks-icon.svg"
              }
              alt={"stacks"}
              width={24}
              height={24}
              style={{
                background: "white",
                borderRadius: 24,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "white",
              }}
            ></Image>
            <Typography variant={"body2"} className={"MuiTypography"}>
              STACKS
            </Typography>
          </Stack>
        </Stack>
      </SecondaryButton>
    </Stack>
  );
};

export default WithBaseSignInDialog(SignInWithNetworkSelectDialog);
