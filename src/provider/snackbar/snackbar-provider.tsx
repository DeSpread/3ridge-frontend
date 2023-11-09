import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import * as React from "react";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const SnackbarContext = createContext<{
  showSnackbar: (msg?: string) => void;
}>({
  showSnackbar: (msg?: string) => {},
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = (msg?: string) => {
    setOpen(true);
    if (msg) setMessage(msg);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
