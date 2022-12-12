import { styled } from "@mui/material";
import Tab from "@mui/material/Tab";
import { ThemeOptions } from "@mui/material/styles/createTheme";
import { TabProps } from "@mui/material/Tab/Tab";

const StyledTab = styled((props: TabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    "&.Mui-selected": {
      color: theme.palette.text.primary,
    },
    color: theme.palette.text.primary,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    borderStyle: "solid",
    "&:hover": {
      borderBottomColor: theme.palette.action.selected,
    },
  })
);

export default StyledTab;
