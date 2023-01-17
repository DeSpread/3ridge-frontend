import {
  Avatar,
  Button,
  ButtonProps,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useMemo,
  useState,
} from "react";
import {
  MouseEventWithStateParam,
  ReversibleSvgIconProps,
  SignedUser,
  Z_INDEX_OFFSET,
} from "../../../type";
import { useTheme } from "@mui/material/styles";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PrimaryButton from "../../../components/atoms/primary-button";
import EthIcon from "../../../components/atoms/svg/eth-icon";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import StringHelper from "../../../helper/string-helper";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { DEFAULT_PROFILE_IMAGE_DATA_SRC } from "../../../const";

const ReversibleMarkEmailReadIcon = (props: ReversibleSvgIconProps) => {
  if (props.reverse) {
    return (
      <MarkEmailReadIcon {...props} color={"disabled"}></MarkEmailReadIcon>
    );
  }
  return <MarkEmailReadIcon {...props}></MarkEmailReadIcon>;
};

type ProfileEditDialogProps = DialogProps & {
  title: string;
  userData: SignedUser;
  isWalletLoggedIn: boolean;
  isMailLoggedIn: boolean;
  walletValidatorButtonOnClick?: MouseEventHandler;
  emailValidatorButtonOnClick?: MouseEventHandler;
  onCloseBtnClicked?: MouseEventHandler;
  onFileImageAdded?: (f: File) => void;
};

type ValidatorButton = ButtonProps & {
  value: string | undefined;
  svgIcon: React.ComponentType<ReversibleSvgIconProps> | undefined;
  label: string | undefined;
  onClick?: MouseEventHandler;
};

export const VALIDATOR_BUTTON_STATES = {
  VALID_HOVER: "VALID_HOVER",
  NOT_VALID_HOVER: "NOT_VALID_HOVER",
  VALID_NOT_HOVER: "VALID_NOT_HOVER",
  NOT_VALID_NOT_HOVER: "NOT_VALID_NOT_HOVER",
};

const ValidatorButton = (props: ValidatorButton) => {
  const theme = useTheme();
  const [mouseOver, setMouseOver] = useState(false);

  const buttonState = useMemo(() => {
    if (props.value && mouseOver) {
      return VALIDATOR_BUTTON_STATES.VALID_HOVER;
    }
    if (!props.value && mouseOver) {
      return VALIDATOR_BUTTON_STATES.NOT_VALID_HOVER;
    }
    if (props.value && !mouseOver) {
      return VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER;
    }
    if (!props.value && !mouseOver) {
      return VALIDATOR_BUTTON_STATES.NOT_VALID_NOT_HOVER;
    }
  }, [mouseOver]);

  return (
    <PrimaryButton
      onMouseEnter={() => {
        setMouseOver(true);
      }}
      onMouseLeave={() => {
        setMouseOver(false);
      }}
      onClick={() => {
        const myEvent = {} as MouseEventWithStateParam;
        myEvent.params = {
          state: buttonState,
        };
        props.onClick?.(myEvent);
      }}
    >
      <Stack
        direction={"row"}
        spacing={1}
        sx={{ paddingLeft: 1, paddingRight: 1 }}
      >
        {props.svgIcon && (
          <props.svgIcon
            reverse={buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER}
          ></props.svgIcon>
        )}
        {props.value && (
          <Typography
            variant={"body2"}
            sx={{
              color:
                buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER
                  ? //@ts-ignore
                    theme.palette.neutral["600"]
                  : //@ts-ignore
                    theme.palette.neutral["100"],
            }}
          >{`${props.label} Connected`}</Typography>
        )}
        {buttonState === VALIDATOR_BUTTON_STATES.VALID_NOT_HOVER && (
          //@ts-ignored
          <DoneIcon sx={{ color: theme.palette.neutral["600"] }}></DoneIcon>
        )}
        {buttonState === VALIDATOR_BUTTON_STATES.VALID_HOVER && (
          <CloseIcon></CloseIcon>
        )}
        {!props.value && (
          <Typography
            variant={"body2"}
            color={"neutral.100"}
          >{`Connect ${props.label}`}</Typography>
        )}
      </Stack>
    </PrimaryButton>
  );
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
        zIndex: Z_INDEX_OFFSET.LOADING_BACKDROP,
      }}
      PaperProps={{
        style: {
          borderRadius: 8,
          borderWidth: 1,
          //@ts-ignore
          borderColor: theme.palette.neutral["800"],
          borderStyle: "solid",
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
            <Avatar
              alt=""
              src={
                props.userData?.profileImageUrl ??
                DEFAULT_PROFILE_IMAGE_DATA_SRC
              }
              sx={{
                width: 100,
                height: 100,
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                background: "rgba(0, 0, 0, 0.5)",
                top: 0,
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
            <Stack direction={"row"}>
              {!props.isWalletLoggedIn && (
                <ValidatorButton
                  label={"Wallet"}
                  svgIcon={EthIcon}
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
                  value={props.userData?.email}
                ></ValidatorButton>
              )}
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
