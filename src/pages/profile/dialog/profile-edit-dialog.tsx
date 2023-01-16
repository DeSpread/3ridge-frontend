import {
  Avatar,
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
import React, { MouseEventHandler, useMemo, useState } from "react";
import SecondaryButton from "../../../components/atoms/secondary-button";
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
        zIndex: Z_INDEX_OFFSET.DIALOG,
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
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAAAXNSR0IArs4c6QAABSdJREFUeF7tnbFtVmEQBP+fyJELQK6AGgipAUISCqEJREJCCBk9GQpw5AjIIZy1vPp2yO/8bm5ueUg8+fr6x6s/l+I/N/cP0ad7vLuN9ks3W5v3qoBphVg/BWT84tVrC1mb1wSMnwxrqICMX7x6bSFr85qA8ZNhDRWQ8YtXry1kbV4TMH4yrKECMn7x6rWFrM1rAsZPhjVUQMYvXr22kLV5TcD4ybCGCsj4xavXFrI2rwkYPxnWUAEZv3j12kLW5jUB4yfDGiog4xevXlvI2rwmYPxkWEMFZPzi1WsLWZvXBIyfDGuogIxfvHptIWvzmoDxk2ENFZDxi1evLWRtXhMwfjKsoQIyfvHqtYWszWsCxk+GNVRAxi9evbaQtXlNwPjJsIYKyPjFq9cWsjavCRg/GdZQARm/ePXaQtbmNQHjJ8MaKiDjF69eW8javCZg/GRYQwVk/OLVawtZm9cEjJ8Ma6iAjF+8em0ha/OagPGTYQ0VkPGLV68tZG1eEzB+MqzhnIA/P3+s/j0h715+Zxsdr/726201gasCVu8HP5wCQoQmIAOogIzfRQEZQAVk/BQQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGUAEZPxMQ8lNACNAEZAAVkPEzASE/BYQATUAGsF7AN5/uqr8JYfitbidwVcD2FZ39fAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gAp49n7rp1PA+hWd/YAKePZ+66dTwPoVnf2ACnj2fuunU8D6FZ39gPW/qCaNv/0jnbWPsBQwbTjsp4AQYHu5Cdi1IROwax9zH+IroAI+KwEFfFb8//9w3wHLFpJ+HN8B00RZPxOQ8YtXm4BxpF0NTcCufZiAXfvwX8Fl+4g/jgkYR4oamoAIX77Yd8A806qOJmDVOi4mYNc+fAcs20f8cUzAOFLU0ARE+PLFvgPmmVZ1NAGr1uE7YNc6Lr4Dti0k/TwmYJoo6+c7IOMXr/YdMI6UNby5f2AN/ql+vLuN9ks3W5u3PgHXFrI2rwKmIwz2U0AIMF2+tpC1eU3A9MXAfgoIAabL1xayNq8JmL4Y2E8BIcB0+dpC1uY1AdMXA/spIASYLl9byNq8JmD6YmA/BYQA0+VrC1mb1wRMXwzsp4AQYLp8bSFr85qA6YuB/RQQAkyXry1kbV4TMH0xsJ8CQoDp8rWFrM1rAqYvBvZTQAgwXb62kLV54wmY/uos/ZFOesHpg0t/s9K+DwVMGwT7KSAE2H5xJiBbcPpvJBOQ7SNebQJCpCYgA6iAjN9FARlABWT8FBDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8TMBIT8FhABNQAZQARk/ExDyU0AI0ARkABWQ8bu0/4/jry8+wAmftvz97y9P+wNg9/SBxP9HtAKyDSsg42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAygAjJ+JiDkp4AQoAnIACog42cCQn4KCAGagAzgmoB/AUkZadkjtJSBAAAAAElFTkSuQmCC"
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
