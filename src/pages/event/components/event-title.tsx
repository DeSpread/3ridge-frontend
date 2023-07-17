import { Box, Skeleton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";

const EventTitle = ({ title }: { title?: string }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));

  return title ? (
    <Box sx={{ background: "", maxWidth: 600 }}>
      <Typography
        variant={smUp ? "h3" : "h4"}
        textAlign={smUp ? "left" : "center"}
        sx={{
          wordBreak: "keep-all",
        }}
      >
        {title}
      </Typography>
    </Box>
  ) : (
    <Box sx={{ width: smUp ? 460 : "60vw" }}>
      <Skeleton variant="text" sx={{ fontSize: smUp ? "2.25rem" : "2rem" }} />
    </Box>
  );
};

export default EventTitle;
