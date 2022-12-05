import { Typography, TypographyProps } from "@mui/material";

const GradientTypography = ({ children, sx }: TypographyProps) => {
  return (
    <Typography
      sx={sx}
      style={{
        background:
          "-webkit-linear-gradient(45deg, #ffff00 10%, #FFC300 26%, #FF69B4 42%, #8A2BE2 58%, #0000ff 74%, #00BFFF 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Typography>
  );
};

export default GradientTypography;
