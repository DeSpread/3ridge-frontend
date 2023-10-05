import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler } from "react";

import { Z_INDEX_OFFSET } from "../../types";

import PrimaryButton from "@/components/atomic/atoms/primary-button";
import SecondaryButton from "@/components/atomic/atoms/secondary-button";

type ConfirmAlertDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  onConfirmBtnClicked?: MouseEventHandler;
  onCancelBtnClicked?: MouseEventHandler;
};

const ConfirmAlertDialog = (props: ConfirmAlertDialogProps) => {
  const { ...rest } = props;
  const theme = useTheme();

  return (
    <>
      <Dialog
        {...rest}
        fullWidth
        maxWidth={"xs"}
        sx={{
          backdropFilter: "blur(2px)",
          zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
        }}
        PaperProps={{
          style: {
            borderRadius: 16,
            borderWidth: 3,
            borderColor: theme.palette.neutral[700],
            borderStyle: "solid",
            padding: 8,
          },
        }}
      >
        {/*{props.title}</DialogTitle>*/}
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textAlign={"left"} variant={"h6"}>
              {props.title}
            </Typography>
            {/*<Button>abc</Button>*/}
            <IconButton
              sx={{
                borderRadius: 32,
                marginRight: 0,
                "&:hover": {
                  boxShadow: "none",
                  transform: "translateY(0px)",
                },
              }}
              onClick={props.onCloseBtnClicked}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
        <DialogActions sx={{ marginRight: 1 }}>
          <SecondaryButton
            sx={{
              borderRadius: 1,
              width: 100,
            }}
            size={"small"}
            onClick={props.onCancelBtnClicked}
          >
            취소
          </SecondaryButton>
          <PrimaryButton
            sx={{
              borderRadius: 1,
              width: 100,
            }}
            size={"small"}
            onClick={props.onConfirmBtnClicked}
          >
            확인
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmAlertDialog;
