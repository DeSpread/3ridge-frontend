import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import Backdrop from "@mui/material/Backdrop";
import { CircularProgress, LinearProgress } from "@mui/material";
import { Z_INDEX_OFFSET } from "../../types";
import { useTheme } from "@mui/material/styles";

const LoadingContext = createContext<{
  showLoading: () => void;
  closeLoading: () => void;
}>({
  showLoading: () => {},
  closeLoading: () => {},
});

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const refBodyStyleOverflow = React.useRef("");
  const theme = useTheme();

  useEffect(() => {
    refBodyStyleOverflow.current = document.body.style.overflow;
  }, []);

  useEffect(() => {
    document.body.style.overflow = open
      ? "hidden"
      : refBodyStyleOverflow.current;
  }, [open]);

  const showLoading = () => {
    setOpen(true);
  };

  const closeLoading = () => {
    setOpen(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        closeLoading,
      }}
    >
      {children}
      <Backdrop
        sx={{
          color: "#fff",
          overflowY: "auto",
          display: "inline-block",
          zIndex: (theme) =>
            theme.zIndex.drawer + Z_INDEX_OFFSET.LOADING_BACKDROP,
        }}
        open={open}
      >
        <LinearProgress
          color={"info"}
          sx={{
            background: (theme) => theme.palette.action.hover,
            width: "100%",
            position: "absolute",
            top: 0,
            borderRadius: 0,
            height: "2px",
          }}
        ></LinearProgress>
      </Backdrop>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
