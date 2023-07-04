import { createContext, PropsWithChildren, useContext } from "react";
import { Snackbar } from "@mui/material";

const SnackbarContext = createContext<{
  showSnackbar: () => void;
}>({
  showSnackbar: () => {},
});

export const SnackbarProvider = ({ children }: PropsWithChildren) => {
  const showSnackbar = () => {
    // setOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      {children}
      <Snackbar></Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
