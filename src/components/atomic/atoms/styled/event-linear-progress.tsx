import { LinearProgress, styled } from "@mui/material";

const EventLinearProgress = styled(LinearProgress)(({ theme }) => ({
  background: theme.palette.neutral["600"],
  "& .MuiLinearProgress-colorPrimary": {
    background:
      "-webkit-linear-gradient(45deg, #cf19f7 25%, #8f50fb 50%, #5c82fd 75%)",
  },
  "& .MuiLinearProgress-barColorPrimary": {
    background:
      "-webkit-linear-gradient(45deg, #cf19f7 25%, #8f50fb 50%, #5c82fd 75%)",
  },
}));

export default EventLinearProgress;
