import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
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
        <Grid container={true} sx={{ width: "100%", background: "" }}>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
          <Grid item xs={4} sx={{ background: "" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{ background: "", width: "100%", paddingLeft: 1 }}
            >
              <AptosIcon width={24} height={24}></AptosIcon>
              <Typography variant={"body2"} className={"MuiTypography"}>
                APTOS
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
        </Grid>
      </SecondaryButton>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.SUI);
        }}
      >
        <Grid container={true} sx={{ width: "100%", background: "" }}>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
          <Grid item xs={4} sx={{ background: "" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              sx={{ background: "", width: "100%", paddingLeft: 1 }}
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
          </Grid>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
        </Grid>
      </SecondaryButton>
      <SecondaryButton
        onClick={(e) => {
          props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.EVM);
        }}
      >
        <Grid container={true} sx={{ width: "100%", background: "" }}>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
          <Grid item xs={4} sx={{ background: "" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={1}
              sx={{ background: "", width: "100%", paddingLeft: 1 }}
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
                Ethereum
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={4} sx={{ background: "" }}></Grid>
        </Grid>
      </SecondaryButton>
    </Stack>
  );
};

export default WithBaseSignInDialog(SignInWithNetworkSelectDialog);
