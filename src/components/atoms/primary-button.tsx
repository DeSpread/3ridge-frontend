import { Button, ButtonProps } from "@mui/material";

const PrimaryButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      color={"primary"}
      sx={{
        borderColor: "transparent",
        boxShadow: "0 0 0 1px #35333a",
        "&:hover": {
          backgroundColor: "transparent",
          transition: "box-shadow 0.1s ease-out 0s",
          boxShadow: "0 0 0 2px #787385",
          borderColor: "transparent",
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

export default PrimaryButton;
