import { Stack, Typography } from "@mui/material";
import Image from "next/image";

import SecondaryButton from "@/components/atomic/atoms/secondary-button";
import AptosIcon from "@/components/atomic/atoms/svg/aptos-icon";
import { useMobile } from "@/provider/mobile/mobile-context";
import { SUPPORTED_NETWORKS, SupportedNetwork } from "@/types";

interface NetworkSelectProps {
  onChangeNetwork?(network: SupportedNetwork): void;
}

export default function NetworkSelect(props: NetworkSelectProps) {
  const { isMobile } = useMobile();

  return (
    <div className="flex flex-col gap-3 py-4">
      <SecondaryButton
        onClick={() => {
          props.onChangeNetwork?.(SUPPORTED_NETWORKS.EVM);
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
        onClick={() => {
          props.onChangeNetwork?.(SUPPORTED_NETWORKS.APTOS);
        }}
        disabled={isMobile ? true : false}
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
        onClick={() => {
          props.onChangeNetwork?.(SUPPORTED_NETWORKS.STACKS);
        }}
        disabled={false}
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
                // mixBlendMode: "luminosity",
              }}
            ></Image>
            <Typography variant={"body2"} className={"MuiTypography"}>
              STACKS
            </Typography>
          </Stack>
        </Stack>
      </SecondaryButton>
    </div>
  );
}
