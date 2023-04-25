import WithBaseSignInDialog, { SignDialogProps } from "./with-base-sign-dialog";
import {
  SUPPORTED_NETWORKS,
  SupportedNetworks,
  ObjectValues,
} from "../../../type";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";

type SignInWithSupportedWalletDialogProps = SignDialogProps & {
  walletInfos: { imageUrl: string; name: string; value: string }[];
  onWalletSelected: (name: string) => void;
};

const SignInWithSupportedWalletDialog = (
  props: SignInWithSupportedWalletDialogProps
) => {
  const theme = useTheme();

  return (
    <>
      <Grid container justifyContent={"center"}>
        {props.walletInfos?.map((item, index) => {
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
                  props?.onWalletSelected(item.name);
                }}
              >
                <Stack alignItems={"center"} spacing={1}>
                  <Image
                    src={item?.imageUrl}
                    alt={""}
                    width={24}
                    height={24}
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
