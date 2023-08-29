import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Box,
  LinearProgress,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { MouseEventHandler } from "react";
import { useTheme } from "@mui/material/styles";
import { Z_INDEX_OFFSET } from "../../types";
import CloseIcon from "@mui/icons-material/Close";
import LinkTypography from "../atomic/atoms/link-typography";

export type ContractLoadingDialogProps = DialogProps & {
  onCloseBtnClicked?: MouseEventHandler;
  link?: string;
  linkName?: string;
};

const ContractLoadingDialog = (props: ContractLoadingDialogProps) => {
  const { link, linkName, ...rest } = props;
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
        // onClose={() => {
        //   // @ts-ignore
        //   props.onCloseBtnClicked?.(undefined);
        // }}
        {...rest}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography textAlign={"center"} variant={"h6"}>
              {props.title}
            </Typography>
            {/*<IconButton*/}
            {/*  sx={{*/}
            {/*    borderRadius: 32,*/}
            {/*    marginRight: 0,*/}
            {/*    "&:hover": {*/}
            {/*      boxShadow: "none",*/}
            {/*    },*/}
            {/*  }}*/}
            {/*  onClick={props.onCloseBtnClicked}*/}
            {/*>*/}
            {/*  <CloseIcon></CloseIcon>*/}
            {/*</IconButton>*/}
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ background: "" }}
            spacing={2}
          >
            <Stack
              sx={{ width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <CircularProgress size={"1.25rem"} />
            </Stack>
            {linkName && link && (
              <LinkTypography href={link}>{linkName}</LinkTypography>
            )}
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContractLoadingDialog;
