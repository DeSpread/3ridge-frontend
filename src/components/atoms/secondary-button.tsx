import { Button, ButtonProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const SecondaryButton = (props: ButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      {...props}
      color={"secondary"}
      variant={"contained"}
      sx={{
        color: theme.palette.neutral[100],
        borderColor: theme.palette.neutral[100],
        borderWidth: 2,
        borderStyle: "solid",
        backgroundColor: theme.palette.neutral[900],
        "&:hover": {
          transition: "all 0.1s ease-out 0s",
          borderColor: "transparent",
          backgroundColor: theme.palette.secondary.main,
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
          transitionProperty: "all",
          color: theme.palette.neutral[900],
          "& .MuiTypography": {
            color: theme.palette.neutral[900],
            transition: "all 0.1s ease-out 0s",
            transitionDuration: "0.1s",
            transitionDelay: "0s",
            transitionTimingFunction: "ease-out",
            transitionProperty: "all",
          },
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Button>
  );
};

export default SecondaryButton;
