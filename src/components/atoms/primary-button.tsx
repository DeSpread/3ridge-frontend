import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const PrimaryButton = (props: ButtonProps) => {
  const theme = useTheme();
  return (
    <Button
      {...props}
      color={"primary"}
      sx={{
        color: theme.palette.neutral[900],
        borderColor: theme.palette.neutral[100],
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: theme.palette.neutral[100],
        "&:hover": {
          color: theme.palette.neutral[100],
          backgroundColor: theme.palette.neutral[900],
          transition: "all 0.1s ease-out 0s",
          borderColor: theme.palette.neutral[100],
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
          transitionProperty: "all",
          borderWidth: 2,
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
