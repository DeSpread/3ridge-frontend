import { Button, ButtonProps } from "@mui/material";

const SecondaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      color={"secondary"}
      variant={"contained"}
      sx={{
        borderColor: "#ffff00",
        boxShadow: "0 0 0 1px #ffff00",
        "&:hover": {
          transition: "box-shadow 0.1s ease-out 0s",
          boxShadow: "0 0 0 3px #ffff00",
          borderColor: "#ffff00",
          transitionDuration: "0.1s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
          transitionProperty: "box-shadow",
        },
      }}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
