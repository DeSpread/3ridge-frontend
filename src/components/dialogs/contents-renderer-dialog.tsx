import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Z_INDEX_OFFSET } from "../../type";
import React, { MouseEventHandler } from "react";
import CloseIcon from "@mui/icons-material/Close";

type ContentsRendererDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  htmlContent?: string;
};

const ContentsRendererDialog = (props: ContentsRendererDialogProps) => {
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
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textAlign={"left"} variant={"h5"}>
              {props.title}
            </Typography>
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
        <DialogContent>
          <div style={{ width: "100%", background: "", marginTop: -32 }}>
            {props?.htmlContent && (
              <div
                dangerouslySetInnerHTML={{ __html: props?.htmlContent }}
              ></div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentsRendererDialog;
