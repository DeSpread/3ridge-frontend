import { Box, ButtonProps, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const GradientButton = (props: ButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  const theme = useTheme();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <Box
        sx={{
          border: "2px solid transparent",
          borderRadius: 16,
          backgroundImage: `linear-gradient(black, black), linear-gradient(to right, ${theme.palette.secondary.main} 0%, ${theme.palette.info.main} 100%)`,
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",
          cursor: "pointer",
          ...props.sx,
        }}
      >
        <Box sx={{ padding: 1, paddingRight: 3, paddingLeft: 3 }}>
          <Typography variant={"body2"} sx={{ color: "transparent" }}>
            {props.children}
          </Typography>
        </Box>
      </Box>
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          borderRadius: 16,
          position: "absolute",
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "",
          width: "100%",
          height: "100%",
          transform: "translateY(-100%)",
          cursor: "pointer",
          transition: "all 0.1s ease-out 0s",
          transitionDuration: "0.2s",
          transitionDelay: "0s",
          transitionTimingFunction: "ease-out",
          transitionProperty: "all",
          "&:hover": {
            background: "#ffb8ff",
          },
        }}
      >
        <Box sx={{ padding: 1, paddingRight: 3, paddingLeft: 3 }}>
          <Typography
            variant={"body2"}
            sx={{ color: isHover ? "black" : "white" }}
          >
            {props.children}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default GradientButton;
