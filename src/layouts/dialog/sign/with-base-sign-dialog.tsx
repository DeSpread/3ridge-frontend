import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  Fade,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { MouseEventHandler } from "react";
import LinkTypography from "../../../components/atomic/atoms/link-typography";
import { TransitionProps } from "@mui/material/transitions";
import CloseIcon from "@mui/icons-material/Close";
import { Z_INDEX_OFFSET } from "../../../type";

type SignDialogProps = DialogProps & {
  title: string;
  onCloseBtnClicked: MouseEventHandler;
};

export type { SignDialogProps };

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

const WithBaseSignInDialog = <P extends SignDialogProps>(
  WrappedContent: React.ComponentType<P>
) => {
  const BaseSignDialog = (props: P) => {
    return (
      <>
        <Dialog
          {...props}
          open={props.open}
          fullWidth
          maxWidth={"xs"}
          TransitionComponent={Transition}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + Z_INDEX_OFFSET.DIALOG,
          }}
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
                sx={{ borderRadius: 32, marginRight: -1 }}
                onClick={props.onCloseBtnClicked}
              >
                <CloseIcon></CloseIcon>
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Stack
              direction={"column"}
              alignItems={"center"}
              spacing={2}
              sx={{ marginTop: 4, marginBottom: 4, background: "" }}
            >
              <Stack
                direction={"column"}
                alignItems={"center"}
                spacing={2}
                sx={{ width: "100%", background: "" }}
              >
                <WrappedContent {...props}></WrappedContent>
              </Stack>
            </Stack>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  return BaseSignDialog;
};

export default WithBaseSignInDialog;
