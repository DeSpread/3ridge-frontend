import { useTheme } from "@mui/material/styles";
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
import { Z_INDEX_OFFSET } from "../../type";
import CloseIcon from "@mui/icons-material/Close";
import React, { MouseEventHandler } from "react";

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
          <Button
            sx={{
              color: theme.palette.neutral[100],
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.02)",
              },
            }}
            onClick={props.onCancelBtnClicked}
          >
            취소
          </Button>
          <Button
            sx={{
              color: theme.palette.neutral[100],
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.02)",
              },
            }}
            onClick={props.onConfirmBtnClicked}
          >
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmAlertDialog;
