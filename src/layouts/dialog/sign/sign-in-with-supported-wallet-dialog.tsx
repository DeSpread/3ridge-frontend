import { Grid, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

import { useMobile } from "../../../provider/mobile/mobile-context";

import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";

type SignInWithSupportedWalletDialogProps = SignDialogProps & {
  walletInfos: {
    imageUrl: string;
    name: string;
    value: string;
    backgroundColor?: string;
    mobile: boolean;
  }[];
  onWalletSelected: ({ name, value }: { name: string; value: string }) => void;
};

const SignInWithSupportedWalletDialog = (
  props: SignInWithSupportedWalletDialogProps
) => {
  const theme = useTheme();
  const { isMobile } = useMobile();

  return (
    <>
      <Grid container justifyContent={"center"} spacing={1}>
        {props.walletInfos
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
                  onClick={(e) => {
                    props?.onWalletSelected({
                      name: item.name,
                      value: item.value,
                    });
                  }}
                >
                  <Stack alignItems={"center"} spacing={1}>
                    <Image
                      src={item?.imageUrl}
                      alt={""}
                      width={24}
                      height={24}
                      style={{
                        background: item?.backgroundColor ?? "transparent",
                        padding: item?.backgroundColor ? 1 : 0,
                        borderRadius: item?.backgroundColor ? 4 : 0,
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
    </>
  );
};

export default WithBaseSignInDialog(SignInWithSupportedWalletDialog);
