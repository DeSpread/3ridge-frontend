import { Typography, TypographyProps } from "@mui/material";

const GradientTypography = (props: TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        background:
          "-webkit-linear-gradient(45deg, #ffff00, #FFC300, #FF69B4, #8A2BE2, #0000ff, #00BFFF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {props.children}
    </Typography>
  );
};

export default GradientTypography;
