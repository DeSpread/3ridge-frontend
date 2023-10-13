import React, { CSSProperties, MouseEventHandler } from "react";

const ConnectLightCircle = ({
  isConnected,
  sx,
  onClick,
}: {
  isConnected: boolean;
  sx?: CSSProperties;
  onClick?: MouseEventHandler;
}) => {
  return (
    <div
      style={{
        background: isConnected ? "green" : "red",
        boxShadow: `-2px 2px 4px ${
          isConnected ? "green" : "red"
        }, 2px -2px 4px ${isConnected ? "green" : "red"}, 2px 2px 4px ${
          isConnected ? "green" : "red"
        }, -2px -2px 4px ${isConnected ? "green" : "red"}`,
        ...sx,
      }}
      onClick={onClick}
    ></div>
  );
};

export default ConnectLightCircle;
