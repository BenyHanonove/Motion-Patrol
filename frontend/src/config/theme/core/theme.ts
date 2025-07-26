import {
  createTheme,
  type Theme,
  type PaletteMode,
} from "@mui/material/styles";
import themeColors from "./palette.json";
import typography from "./typography";

const { dark, light } = themeColors;

// Custom Dark Theme
export const darkTheme: Theme = createTheme({
  palette: {
    mode: dark.mode as PaletteMode,
    primary: {
      main: dark.primary.main,
    },
    secondary: {
      main: dark.secondary.main,
    },
    background: {
      default: dark.background.default,
      paper: dark.background.paper,
    },
    text: {
      primary: dark.text.primary,
      secondary: dark.text.secondary,
    },
    warning: {
      main: dark.warning.main,
    },
    error: {
      main: dark.error.main,
    },
  },
  typography,
});

// Custom Light Theme
export const lightTheme: Theme = createTheme({
  palette: {
    mode: light.mode as PaletteMode,
    primary: {
      main: light.primary.main,
    },
    secondary: {
      main: light.secondary.main,
    },
    background: {
      default: light.background.default,
      paper: light.background.paper,
    },
    text: {
      primary: light.text.primary,
      secondary: light.text.secondary,
    },
    warning: {
      main: light.warning.main,
    },
    error: {
      main: light.error.main,
    },
  },
  typography,
});
