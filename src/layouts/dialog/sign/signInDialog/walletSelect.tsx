import { Grid, IconButton, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";

import ResourceHelper from "@/helper/resource-helper";
import TypeHelper from "@/helper/type-helper";
import { useMobile } from "@/provider/mobile/mobile-context";
import { SupportedNetwork } from "@/types";

interface WalletSelectProps {
  network: SupportedNetwork;
  onChangeWallet?: (value: string) => void;
}

export default function WalletSelect(props: WalletSelectProps) {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <Grid container justifyContent={"center"} spacing={1}>
      {ResourceHelper.getWalletInfos(
        TypeHelper.convertToSuppoertedNetwork(props.network),
      )
        ?.filter((e) => (isMobile ? e.mobile : true))
        ?.map((item, index) => {
          return (
            <Grid key={index} item>
              <IconButton
                sx={{
                  width: 82,
                  height: 82,
                  padding: 4,
                  borderWidth: 2,
                  borderStyle: "solid",
                  transition: "all 0.2s ease-out 0s",
                  transitionDuration: "0.2s",
                  transitionDelay: "0s",
                  borderColor: theme.palette.neutral[500],
                  "&:hover": {
                    borderColor: theme.palette.secondary.main,
                  },
                }}
                onClick={() => {
                  props.onChangeWallet?.(item.value);
                }}
              >
                <Stack alignItems={"center"} spacing={1}>
                  <Image
                    src={item?.imageUrl}
                    alt={""}
                    width={24}
                    height={24}
                    style={{
                      background: "transparent",
                      padding: 0,
                      borderRadius: 0,
                    }}
                  ></Image>
                  <Typography
                    variant={"caption"}
                    sx={{
                      lineHeight: 1,
                    }}
                  >
                    {item.name}
                  </Typography>
                </Stack>
              </IconButton>
            </Grid>
          );
        })}
    </Grid>
  );
}
