import { styled, Tabs } from "@mui/material";
import React from "react";
import { TabsProps } from "@mui/material/Tabs/Tabs";

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

// const StyledTabs = styled(Tabs)(({ theme }) => ({
//   "& .MuiTabs-indicator": {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//   },
//   "& .MuiTabs-indicatorSpan": {
//     maxWidth: 40,
//     width: "100%",
//     backgroundColor: theme.pallet,
//   },
// }));

const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))(({ theme }) => ({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    // maxWidth: 40,
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default StyledTabs;
