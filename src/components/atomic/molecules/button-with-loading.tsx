import { ButtonProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";

import { MouseEventWithParam } from "../../../types";
import SecondaryButton from "../atoms/secondary-button";

const ButtonWithLoading = ({
  loading,
  ...props
}: ButtonProps & { loading?: boolean }) => {
  // const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SecondaryButton
        {...props}
        fullWidth={true}
        disabled={props.disabled || loading}
        onClick={(e) => {
          // setLoading(true);
          // const myEvent = {} as MouseEventWithParam<{
          //   callback: (msg: string) => void;
          // }>;
          // myEvent.params = {
          //   callback: (msg: string) => {
          //     setLoading(false);
          //   },
          // };
          // //@ts-ignore
          props.onClick?.(e);
        }}
      >
        {props.children}
      </SecondaryButton>
      {loading && (
        <div
          style={{
            position: "absolute",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            transform: "translateY(-100%)",
            height: "100%",
          }}
        >
          <CircularProgress sx={{ color: "white" }}></CircularProgress>
        </div>
      )}
    </div>
  );
};

export default ButtonWithLoading;
