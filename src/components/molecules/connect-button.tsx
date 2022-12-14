import { Button, ButtonProps } from "@mui/material";
import PrimaryButton from "../atoms/primary-button";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MouseEvent } from "react";
import SecondaryButton from "../atoms/secondary-button";

const ConnectButton = (props: ButtonProps) => {
  const { connect, connectors } = useConnect();
  return (
    <SecondaryButton
      {...props}
      onClick={(event: MouseEvent) => {
        connect({ connector: connectors[0] });
        // @ts-ignore
        props.onClick?.(event);
      }}
    >
      {props.children}
    </SecondaryButton>
  );
};

export default ConnectButton;
