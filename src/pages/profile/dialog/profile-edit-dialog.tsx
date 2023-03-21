import {
  Avatar,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler } from "react";
import { ReversibleSvgIconProps, User, Z_INDEX_OFFSET } from "../../../type";
import { useTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import StringHelper from "../../../helper/string-helper";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../../const";
import { ValidatorButton } from "../../../components/molecules/validator-button";
import AptosIcon from "../../../components/atoms/svg/aptos-icon";
import BlockIcon from "../../../components/molecules/block-icon";

const ReversibleMarkEmailReadIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return <EmailIcon {...props} color={"disabled"}></EmailIcon>;
  }
  return <EmailIcon {...props}></EmailIcon>;
};

const ReversibleTwitterReadIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return <TwitterIcon {...props} color={"disabled"}></TwitterIcon>;
  }
  return <TwitterIcon {...props} sx={{ color: "#1d9aef" }}></TwitterIcon>;
};

const NotWalletConnectedAptosIcon = (props: ReversibleSvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="100%"
        height="100%"
        version="1.2"
        baseProfile="tiny"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112 112"
        overflow="visible"
      >
        <path d="M86.6 37.4h-9.9c-1.1 0-2.2-.5-3-1.3l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.4 3.9c-1.1 1.3-2.8 2-4.5 2H2.9C1.4 41.9.4 46.6 0 51.3h51.2c.9 0 1.8-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4H112c-.4-4.7-1.4-9.4-2.9-13.8H86.6zM53.8 65l-4-4.5c-1.2-1.3-3.1-1.4-4.5-.3l-.3.3-3.5 3.9c-1.1 1.3-2.7 2-4.4 2H.8c.9 4.8 2.5 9.5 4.6 14h25.5c.9 0 1.7-.4 2.4-1l4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1.1l4 4.5c.8.9 1.9 1.4 3 1.4h56.6c2.1-4.4 3.7-9.1 4.6-14H56.8c-1.2 0-2.3-.5-3-1.4zm19.6-43.6 4.8-5c.6-.6 1.4-1 2.3-1h.2c.9 0 1.8.4 2.4 1l4 4.5c.8.9 1.9 1.3 3 1.3h10.8c-18.8-24.8-54.1-29.7-79-11-4.1 3.1-7.8 6.8-11 11H71c1 .2 1.8-.2 2.4-.8zM34.7 94.2c-1.2 0-2.3-.5-3-1.3l-4-4.5c-1.2-1.3-3.2-1.4-4.5-.2l-.2.2-3.5 3.9c-1.1 1.3-2.7 2-4.4 2h-.2C36 116.9 71.7 118 94.4 96.7c.9-.8 1.7-1.7 2.6-2.6H34.7z"></path>
      </svg>
    </SvgIcon>
  );
};

const WalletConnectedAptosIcon = (props: ReversibleSvgIconProps) => {
  return <AptosIcon {...props} width={18} height={18}></AptosIcon>;
};

type ProfileEditDialogProps = DialogProps & {
  title: string;
  userData: User;
  isWalletLoggedIn: boolean;
  isMailLoggedIn: boolean;
  walletValidatorButtonOnClick?: MouseEventHandler;
  emailValidatorButtonOnClick?: MouseEventHandler;
  twitterValidatorButtonOnClick?: MouseEventHandler;
  onCloseBtnClicked?: MouseEventHandler;
  onFileImageAdded?: (f: File) => void;
};

const ProfileEditDialog = (props: ProfileEditDialogProps) => {
  const theme = useTheme();
  const { ...rest } = props;

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
        <Stack spacing={4} sx={{ padding: 4 }}>
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
            {/*<Avatar*/}
            {/*  alt=""*/}
            {/*  src={*/}
            {/*    props.userData?.profileImageUrl*/}
            {/*      ? props.userData?.profileImageUrl*/}
            {/*      : DEFAULT_PROFILE_IMAGE_DATA_SRC*/}
            {/*  }*/}
            {/*  sx={{*/}
            {/*    width: 100,*/}
            {/*    height: 100,*/}
            {/*  }}*/}
            {/*/>*/}
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
          <Stack spacing={2}>
            <Typography variant={"h6"}>Social profiles</Typography>
            <Divider></Divider>
            <Stack direction={"row"} spacing={1}>
              {!props.isWalletLoggedIn && (
                <ValidatorButton
                  label={"Wallet"}
                  svgIcon={
                    props.userData?.walletAddress
                      ? WalletConnectedAptosIcon
                      : NotWalletConnectedAptosIcon
                  }
                  onClick={props.walletValidatorButtonOnClick}
                  size={"small"}
                  value={
                    props.userData?.walletAddress
                      ? StringHelper.getInstance().getMidEllipsisString(
                          props.userData?.walletAddress
                        )
                      : undefined
                  }
                />
              )}
              {!props.isMailLoggedIn && (
                <ValidatorButton
                  svgIcon={ReversibleMarkEmailReadIcon}
                  label={"Email"}
                  onClick={props.emailValidatorButtonOnClick}
                  size={"small"}
                  value={
                    props.userData?.email ? props.userData?.email : undefined
                  }
                ></ValidatorButton>
              )}
              <ValidatorButton
                svgIcon={ReversibleTwitterReadIcon}
                label={"Twitter"}
                onClick={props.twitterValidatorButtonOnClick}
                size={"small"}
                value={
                  props.userData?.userSocial?.twitterId
                    ? props.userData?.userSocial?.twitterId
                    : undefined
                }
              ></ValidatorButton>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
