import { Button, ButtonProps } from "@mui/material";
import PrimaryButton from "./primary-button";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { MouseEvent } from "react";

const ConnectButton = (props: ButtonProps) => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  return address ? (
    <PrimaryButton {...props}>{"Connected"}</PrimaryButton>
  ) : (
    <PrimaryButton
      {...props}
      onClick={(event: MouseEvent) => {
        // @ts-ignore
        props.onClick?.(event);
        connect({ connector: connectors[0] });
      }}
    >
      {"Connect wallet"}
    </PrimaryButton>
  );
};

export default ConnectButton;
