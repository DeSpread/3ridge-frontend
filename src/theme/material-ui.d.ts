import { PaletteOptions } from "@mui/material/styles/createPalette";

interface NeutralColor {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

declare module "@mui/material/styles/createPalette" {
  export interface PaletteOptions {
    neutral: NeutralColor;
  }
}

declare module "@mui/material/styles/createPalette" {
  export interface Palette {
    neutral: NeutralColor;
  }
}
