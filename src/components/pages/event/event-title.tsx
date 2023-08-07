import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { useTheme } from "@mui/material/styles";

const EventTitle = ({ title }: { title?: string } & PropsWithChildren) => {
  const theme = useTheme();
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
      <Typography variant={smUp ? "h3" : "h4"}>&nbsp;</Typography>
    </Box>
  );
};

export default EventTitle;
