import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { MouseEventHandler } from "react";
import {
  ReversibleSvgIconProps,
  SUPPORTED_NETWORKS,
  User,
  Z_INDEX_OFFSET,
} from "../../../type";
import { useTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import StringHelper from "../../../helper/string-helper";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { ValidatorButton } from "../../../components/molecules/validator-button";
import BlockIcon from "../../../components/molecules/block-icon";
import ResourceFactory from "../../../helper/resource-factory";
// @ts-ignore
import TelegramLoginButton from "react-telegram-login";
import { getUserMail } from "../../../util/type-util";
import { useMobile } from "../../../provider/mobile/mobile-context";
import PrimaryButton from "../../../components/atoms/primary-button";
import SecondaryButton from "../../../components/atoms/secondary-button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

const ReversibleMarkEmailIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return <EmailIcon {...props} color={"disabled"}></EmailIcon>;
  }
  return <EmailIcon {...props}></EmailIcon>;
};

const ReversibleTwitterIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return <TwitterIcon {...props} color={"disabled"}></TwitterIcon>;
  }
  return <TwitterIcon {...props} sx={{ color: "#1d9aef" }}></TwitterIcon>;
};

const ReversibleTelegramIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return <TelegramIcon {...props} color={"disabled"}></TelegramIcon>;
  }
  return <TelegramIcon {...props} sx={{ color: "#1d9aef" }}></TelegramIcon>;
};

type ProfileEditDialogProps = DialogProps & {
  title: string;
  userData: User;
  isWalletLoggedIn: boolean;
  isMailLoggedIn: boolean;
  walletValidatorButtonOnClick?: MouseEventHandler;
  emailValidatorButtonOnClick?: MouseEventHandler;
  twitterValidatorButtonOnClick?: MouseEventHandler;
  telegramValidatorButtonOnClick?: MouseEventHandler;
  onCloseBtnClicked?: MouseEventHandler;
  onFileImageAdded?: (f: File) => void;
  backDirectionPath?: string;
};

const ProfileEditDialog = (props: ProfileEditDialogProps) => {
  const theme = useTheme();
  const { ...rest } = props;
  const resourceFactory = ResourceFactory.getInstance();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const BUTTON_WIDTH = smUp ? 340 : "100%";
  const { isMobile } = useMobile();
  const router = useRouter();

  return (
    <Dialog
      {...rest}
      fullWidth
      maxWidth={"sm"}
      sx={{
        backdropFilter: "blur(2px)",
        zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
      }}
      PaperProps={{
        style: {
          borderRadius: 8,
          borderWidth: 1,
          borderColor: theme.palette.neutral["800"],
          borderStyle: "solid",
          boxShadow: "inset 4px 4px 4px #35333a, inset -4px -4px 4px #35333a",
        },
      }}
    >
      <DialogTitle>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ padding: 4, paddingTop: 2, paddingBottom: 2 }}
        >
          <Typography textAlign={"left"} variant={"h5"}>
            {props.title}
          </Typography>
          <IconButton
            sx={{ borderRadius: 32, marginRight: -1 }}
            onClick={props.onCloseBtnClicked}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack>
          <Stack
            spacing={4}
            sx={{ padding: 4 }}
            direction={smUp ? "row" : "column"}
            alignItems={smUp ? "flex-start" : "center"}
          >
            <div style={{ position: "relative" }}>
              {props.userData?.profileImageUrl && (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={props.userData?.profileImageUrl}
                ></Avatar>
              )}
              {!props.userData?.profileImageUrl && props.userData?._id && (
                <div style={{ zIndex: 2 }}>
                  <BlockIcon seed={props.userData?._id} scale={12}></BlockIcon>
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  width: 100,
                  height: 100,
                  background: "rgba(0, 0, 0, 0.5)",
                  top: props.userData?.profileImageUrl ? 0 : -2,
                  left: props.userData?.profileImageUrl ? 0 : -2,
                  borderRadius: 50,
                }}
              >
                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    top: 30,
                    left: 30,
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    background: "rgba(0, 0, 0, 0.25)",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <input
                    name={"newImage"}
                    type="file"
                    hidden
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        if (
                          /\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)
                        ) {
                          props.onFileImageAdded?.(file);
                        }
                      }
                      e.target.value = "";
                    }}
                  />
                  <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                </IconButton>
              </div>
            </div>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Typography variant={"h6"}>Socials</Typography>
                <Divider></Divider>
                <Stack spacing={1}>
                  {!props.isMailLoggedIn && (
                    <ValidatorButton
                      svgIcon={ReversibleMarkEmailIcon}
                      label={"Email"}
                      onClick={props.emailValidatorButtonOnClick}
                      size={"small"}
                      value={getUserMail(props.userData)}
                      fullWidth={true}
                      payload={""}
                    ></ValidatorButton>
                  )}
                  <ValidatorButton
                    svgIcon={ReversibleTwitterIcon}
                    label={"Twitter"}
                    onClick={props.twitterValidatorButtonOnClick}
                    size={"small"}
                    value={
                      props.userData?.userSocial?.twitterId
                        ? props.userData?.userSocial?.twitterId
                        : undefined
                    }
                    payload={""}
                  ></ValidatorButton>
                  <ValidatorButton
                    svgIcon={ReversibleTelegramIcon}
                    label={"Telegram"}
                    onClick={props.telegramValidatorButtonOnClick}
                    size={"small"}
                    value={
                      props.userData?.userSocial?.telegramUser?.username ??
                      undefined
                    }
                    payload={""}
                  ></ValidatorButton>
                </Stack>
              </Stack>
              <Stack spacing={2}>
                <Typography variant={"h6"}>Wallets</Typography>
                <Divider></Divider>
                <Stack spacing={1}>
                  {Object.values(SUPPORTED_NETWORKS)
                    .filter(
                      (_, index) =>
                        index !== Object.values(SUPPORTED_NETWORKS).length - 1
                    )
                    .filter(
                      (e) =>
                        !(
                          props.isWalletLoggedIn &&
                          props.userData?.walletAddressInfos?.[0].network === e
                        )
                    )
                    .filter((e) => e !== SUPPORTED_NETWORKS.SUI)
                    .map((e, i) => {
                      const addressInfo =
                        props.userData?.walletAddressInfos?.filter(
                          (addrInfo) => addrInfo.network === e
                        )?.[0];

                      const disabledBtn = !(
                        (!isMobile && e === SUPPORTED_NETWORKS.APTOS) ||
                        e === SUPPORTED_NETWORKS.EVM ||
                        e === SUPPORTED_NETWORKS.STACKS
                      );

                      return (
                        <Box sx={{ width: "100%" }} key={i}>
                          {disabledBtn && (
                            <ValidatorButton
                              disabled={disabledBtn}
                              label={e.toUpperCase()}
                              svgIcon={resourceFactory.getValidatorButtonSvg(e)}
                              onClick={props.walletValidatorButtonOnClick}
                              size={"small"}
                              value={StringHelper.getInstance().getMidEllipsisString(
                                addressInfo?.address
                              )}
                              payload={e}
                              sx={{
                                width: BUTTON_WIDTH,
                                background: "#3b383f",
                                borderColor: "#f3f4f6",
                              }}
                            />
                          )}
                          {!disabledBtn && (
                            <ValidatorButton
                              // disabled={disabledBtn}
                              label={e.toUpperCase()}
                              svgIcon={resourceFactory.getValidatorButtonSvg(e)}
                              onClick={props.walletValidatorButtonOnClick}
                              size={"small"}
                              value={StringHelper.getInstance().getMidEllipsisString(
                                addressInfo?.address
                              )}
                              payload={e}
                              sx={{
                                width: BUTTON_WIDTH,
                              }}
                            />
                          )}
                        </Box>
                      );
                    })}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {props?.backDirectionPath && (
            <Box sx={{ width: "100%", background: "", marginLeft: 1 }}>
              <Button
                sx={{
                  color: theme.palette.neutral[100],
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                  },
                }}
                startIcon={<ArrowBackIcon></ArrowBackIcon>}
                onClick={async (e) => {
                  setTimeout(() => {
                    if (props?.backDirectionPath)
                      router.push(props?.backDirectionPath);
                  }, 0);
                }}
              >
                이전 이벤트로
              </Button>
            </Box>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
