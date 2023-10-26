import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { MouseEventHandler } from "react";

import { VerifyQuizQuestContext, Z_INDEX_OFFSET } from "../../types";

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
        <Box sx={{ padding: "16px 24px" }}>
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
        </Box>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};

export default SimpleDialog;
