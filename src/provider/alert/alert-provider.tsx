import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  Paper,
  PaperProps,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { TransitionProps } from "@mui/material/transitions";
import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";

import LinkTypography from "../../components/atomic/atoms/link-typography";
import ErrorInfoForm from "../../components/form/error-info-form";
import ComponentHelper from "../../helper/component-helper";



const AlertContext = createContext<{
  showAlert: ({
    title,
    content,
  }: {
    title: string;
    content: string | ReactElement;
  }) => void;
  showErrorAlert: ({ content }: { content: string | ReactElement }) => void;
  closeAlert: () => void;
}>({
  showAlert: ({ title, content }) => {},
  showErrorAlert: ({ content }) => {},
  closeAlert: () => {},
});

type AlertDesc = {
  title?: string;
  content?: string | ReactElement;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const alertDescRef = useRef<AlertDesc>({});
  const theme = useTheme();

  const showAlert = ({
    title,
    content,
  }: {
    title: string;
    content: string | ReactElement;
  }) => {
    alertDescRef.current.title = title;
    alertDescRef.current.content = content;
    setOpen(true);
  };

  const showErrorAlert = ({ content }: { content: string | ReactElement }) => {
    alertDescRef.current.title = "오류가 발생했습니다";
    alertDescRef.current.content = (
      <ErrorInfoForm content={content}></ErrorInfoForm>
    );
    setOpen(true);
  };

  const closeAlert = () => {
    alertDescRef.current.title = undefined;
    alertDescRef.current.content = undefined;
    setOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert, showErrorAlert }}>
      {children}
      <Dialog
        open={open}
        fullWidth
        maxWidth={"xs"}
        TransitionComponent={Transition}
        onClose={() => {
          closeAlert();
        }}
        aria-labelledby="draggable-dialog-title"
        PaperComponent={(props: PaperProps) => {
          return (
            <Draggable
              handle="#draggable-dialog-title"
              cancel={'[class*="MuiDialogContent-root"]'}
            >
              <Paper {...props} />
            </Draggable>
          );
        }}
      >
        <DialogTitle id="draggable-dialog-title" style={{ cursor: "move" }}>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography textAlign={"left"} variant={"h6"}>
              {alertDescRef.current.title}
            </Typography>
            <IconButton
              sx={{ borderRadius: 32, marginRight: -1 }}
              onClick={(e) => {
                closeAlert();
              }}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Stack>
        </DialogTitle>
        <Stack
          direction={"column"}
          sx={{
            background: "",
            minHeight: 96,
            padding: 3,
            paddingTop: 0,
          }}
          justifyContent={"center"}
        >
          <DialogContentText sx={{ background: "" }}>
            {typeof alertDescRef.current.content === "string" &&
              ComponentHelper.renderMultiLineContentText(
                alertDescRef.current.content
              )}
            {typeof alertDescRef.current.content !== "string" &&
              alertDescRef.current.content}
          </DialogContentText>
        </Stack>
      </Dialog>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
