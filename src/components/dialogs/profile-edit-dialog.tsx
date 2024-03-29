import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import TelegramIcon from "@mui/icons-material/Telegram";
import TwitterIcon from "@mui/icons-material/Twitter";
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
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";

import ResourceHelper from "../../helper/resource-helper";
import StringHelper from "../../helper/string-helper";
import TypeHelper from "../../helper/type-helper";
import { useMobile } from "../../provider/mobile/mobile-context";
import { SUPPORTED_NETWORKS, User, Z_INDEX_OFFSET } from "../../types";
import DiscordIcon from "../atomic/atoms/svg/discord-icon";
import KakaoIcon from "../atomic/atoms/svg/kakao-icon";
import BlockIcon from "../atomic/molecules/block-icon";
import { ValidatorButton } from "../atomic/molecules/validator-button";

type ProfileEditDialogProps = DialogProps & {
  title: string;
  userData: User;
  isWalletLoggedIn: boolean;
  isMailLoggedIn: boolean;
  walletValidatorButtonOnClick?: MouseEventHandler;
  emailValidatorButtonOnClick?: MouseEventHandler;
  twitterValidatorButtonOnClick?: MouseEventHandler;
  telegramValidatorButtonOnClick?: MouseEventHandler;
  kakaoValidatorButtonOnClick?: MouseEventHandler;
  discordValidatorButtonOnClick?: MouseEventHandler;
  onCloseBtnClicked?: MouseEventHandler;
  onFileImageAdded?: (f: File) => void;
  backDirectionPath?: string;
};

const ProfileEditDialog = (props: ProfileEditDialogProps) => {
  const theme = useTheme();
  const { ...rest } = props;
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
                      icon={<EmailIcon></EmailIcon>}
                      label={"Email"}
                      onClick={props.emailValidatorButtonOnClick}
                      size={"small"}
                      value={TypeHelper.getUserMail(props.userData)}
                      fullWidth={true}
                      payload={""}
                    ></ValidatorButton>
                  )}
                  <ValidatorButton
                    icon={<TwitterIcon sx={{ color: "#1d9aef" }}></TwitterIcon>}
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
                    icon={
                      <TelegramIcon sx={{ color: "#1d9aef" }}></TelegramIcon>
                    }
                    label={"Telegram"}
                    onClick={props.telegramValidatorButtonOnClick}
                    size={"small"}
                    value={
                      props.userData?.userSocial?.telegramUser?.username ??
                      undefined
                    }
                    payload={""}
                  ></ValidatorButton>
                  {/* <ValidatorButton
                    icon={<KakaoIcon sx={{ color: "black" }}></KakaoIcon>}
                    label={"카카오톡"}
                    onClick={props.kakaoValidatorButtonOnClick}
                    size={"small"}
                    value={props.userData?.kakao?.id.toString() ?? undefined}
                    payload={""}
                  ></ValidatorButton> */}
                  <ValidatorButton
                    icon={<DiscordIcon></DiscordIcon>}
                    label={"Discord"}
                    onClick={props.discordValidatorButtonOnClick}
                    size={"small"}
                    value={props.userData?.discord?.username ?? undefined}
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
                        index !== Object.values(SUPPORTED_NETWORKS).length - 1,
                    )
                    .filter(
                      (e) =>
                        !(
                          props.isWalletLoggedIn &&
                          props.userData?.walletAddressInfos?.[0].network === e
                        ),
                    )
                    .filter((e) => e !== SUPPORTED_NETWORKS.SUI)
                    .map((e, i) => {
                      const addressInfo =
                        props.userData?.walletAddressInfos?.filter(
                          (addrInfo) => addrInfo.network === e,
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
                              icon={ResourceHelper.getValidatorButtonSvg(e)}
                              onClick={props.walletValidatorButtonOnClick}
                              size={"small"}
                              value={StringHelper.convertAddressToMidEllipsis(
                                addressInfo?.address,
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
                              icon={ResourceHelper.getValidatorButtonSvg(e)}
                              onClick={props.walletValidatorButtonOnClick}
                              size={"small"}
                              value={StringHelper.convertAddressToMidEllipsis(
                                addressInfo?.address,
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
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
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
