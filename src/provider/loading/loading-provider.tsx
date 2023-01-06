import { createContext, PropsWithChildren, useContext } from "react";
import { Dialog, Stack, Typography } from "@mui/material";

const LoadingContext = createContext<{
  showLoading: () => void;
  closeLoading: () => void;
}>({
  showLoading: () => {},
  closeLoading: () => {},
});

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const showLoading = () => {};

  const closeLoading = () => {};

  return (
    <LoadingContext.Provider
      value={{
        showLoading,
        closeLoading,
      }}
    >
      {children}
      <Dialog open={true}>
        <Stack>
          <Typography textAlign={"center"} variant={"h3"}>
            abc
          </Typography>
          {/*<Typhography>aaa</Typhography>*/}
          {/*<Typhography></Typhography>*/}
        </Stack>
      </Dialog>
      {/*<div*/}
      {/*  style={{*/}
      {/*    position: "relative",*/}
      {/*    width: "100%",*/}
      {/*    height: `100vh`,*/}
      {/*    background: "red",*/}
      {/*    backdropFilter: "blur(1px)",*/}
      {/*  }}*/}
      {/*></div>*/}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
