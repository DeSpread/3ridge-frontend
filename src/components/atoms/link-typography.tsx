import NextLink from "next/link";
import { Typography, TypographyProps } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type LinkTypographyProps = TypographyProps & {
  href?: string;
};

const LinkTypography = (props: LinkTypographyProps) => {
  const theme = useTheme();
  return (
    <NextLink href={props.href ?? ""}>
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
    </NextLink>
  );
};

export default LinkTypography;
