import { Typography, TypographyProps } from "@mui/material";

const GradientTypography = (props: TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{
        ...props.sx,
        background: (theme) =>
          `-webkit-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.neutral["100"]})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {props.children}
    </Typography>
  );
};

export default GradientTypography;
