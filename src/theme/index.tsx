import {
  createTheme as createMuiTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { baseThemeOptions } from "./base-theme-options";
import { darkThemeOptions } from "./dark-theme-options";
// import LINESeedKR from "../../public/fonts/LineSeed/LINESeedKR-Rg.woff";

export const createTheme = () => {
  const theme = createMuiTheme(baseThemeOptions, darkThemeOptions);
  return theme;
};
