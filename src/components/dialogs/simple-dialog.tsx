import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler } from "react";
import { QuizQuestContext, Z_INDEX_OFFSET } from "../../type";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

export type SimpleDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
};

const SimpleDialog = (props: SimpleDialogProps) => {
  const { ...rest } = props;
  const theme = useTheme();

  return (
    <>
      <Dialog
        maxWidth={"xs"}
        fullWidth
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
        onClose={() => {
          // @ts-ignore
          props.onCloseBtnClicked?.(undefined);
        }}
        {...rest}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textAlign={"left"} variant={"h6"}>
              {props.title}
            </Typography>
            <IconButton
              sx={{
                borderRadius: 32,
                marginRight: 0,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
              onClick={props.onCloseBtnClicked}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleDialog;
