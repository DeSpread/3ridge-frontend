import { Typography, TypographyProps } from "@mui/material";

const ClickTypography = (props: TypographyProps) => {
  return (
    <Typography
      sx={{
        ...props.sx,
        fontWeight: "bold",
        color: "#f8810a",
        "&:hover": {
          color: "#904e1d",
          textDecoration: "underline",
        },
        cursor: "pointer",
      }}
      {...props}
      // variant={"body2"}
    >
      {props.children}
    </Typography>
  );
};

export default ClickTypography;
