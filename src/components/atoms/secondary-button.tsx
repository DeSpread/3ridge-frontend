import { Button, ButtonProps } from "@mui/material";
import { keyframes, css } from "@emotion/react";

const scaleDown = keyframes`
  from, to {
    transform: scale(1);
  }
`;

const scaleUp = keyframes`
  from, to {
    transform: scale(1.01);
  }
`;

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      color={"secondary"}
      // sx={{
      //   // animation: `${scaleDown} 0.5s ease`,
      //   "&:hover": {
      //     // animation: `${scaleUp} 0.5s ease`,
      //   },
      // }}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
