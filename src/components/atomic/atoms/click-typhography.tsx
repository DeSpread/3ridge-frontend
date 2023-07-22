import { useTheme } from "@mui/material/styles";
import NextLink from "next/link";
import { Typography, TypographyProps } from "@mui/material";

const ClickTypography = (props: TypographyProps) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        ...props.sx,
        fontWeight: "bold",
        "&:hover": {
          color: theme.palette.action.hover,
          textDecoration: "underline",
        },
      }}
      {...props}
      // variant={"body2"}
    >
      {props.children}
    </Typography>
  );
};

export default ClickTypography;
