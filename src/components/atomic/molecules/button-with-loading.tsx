import { ButtonProps } from "@mui/material";
import React, { useState } from "react";
import SecondaryButton from "../atoms/secondary-button";
import { MouseEventWithParam } from "../../../types";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonWithLoading = (props: ButtonProps) => {
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <SecondaryButton
        {...props}
        fullWidth={true}
        disabled={props.disabled || loading}
        onClick={(e) => {
          setLoading(true);
          const myEvent = {} as MouseEventWithParam<{
            callback: (msg: string) => void;
          }>;
          myEvent.params = {
            callback: (msg: string) => {
              setLoading(false);
            },
          };
          //@ts-ignore
          props.onClick?.(myEvent);
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
