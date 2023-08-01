import NextLink from "next/link";
import { Typography, TypographyProps } from "@mui/material";

type LinkTypographyProps = TypographyProps & {
  href?: string;
};

const LinkTypography = (props: LinkTypographyProps) => {
  return (
    <NextLink href={props.href ?? ""} rel="noopener noreferrer" target="_blank">
      <Typography
        sx={{
          fontWeight: "bold",
          color: "#f8810a",
          "&:hover": {
            color: "#904e1d",
            textDecoration: "underline",
          },
          cursor: "pointer",
        }}
        {...props}
      >
        {props.children}
      </Typography>
    </NextLink>
  );
};

export default LinkTypography;
