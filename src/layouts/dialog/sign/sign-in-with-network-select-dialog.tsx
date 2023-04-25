import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import React, { MouseEventHandler } from "react";
import { Stack, Typography } from "@mui/material";
import SecondaryButton from "../../../components/atoms/secondary-button";
import Image from "next/image";
import AptosIcon from "../../../components/atoms/svg/aptos-icon";
import { SUPPORTED_NETWORKS, SupportedNetworks } from "../../../type";

type SignInWithWalletDialogProps = SignDialogProps & {
  onNetworkButtonClicked: (network: SupportedNetworks) => void;
};

const SignInWithNetworkSelectDialog = (props: SignInWithWalletDialogProps) => {
  return (
    <Stack sx={{ width: "100%" }} spacing={8}>
      <Stack sx={{ width: "100%" }} spacing={2}>
        <SecondaryButton
          onClick={(e) => {
            props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.APTOS);
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <AptosIcon width={24} height={24}></AptosIcon>
            <Typography variant={"body2"} className={"MuiTypography"}>
              APTOS
            </Typography>
          </Stack>
        </SecondaryButton>
        <SecondaryButton
          onClick={(e) => {
            props.onNetworkButtonClicked?.(SUPPORTED_NETWORKS.SUI);
          }}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
        </SecondaryButton>
      </Stack>
    </Stack>
  );
};

export default WithBaseSignInDialog(SignInWithNetworkSelectDialog);
