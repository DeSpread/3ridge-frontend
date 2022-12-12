import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";

export const createTheme = () => {
  const theme = createMuiTheme(baseThemeOptions, darkThemeOptions);
  return theme;
};
