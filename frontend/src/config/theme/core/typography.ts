import type { ThemeOptions } from "@mui/material/styles";

// Use only Helvetica
const fontFamily = "Helvetica";

const typography: ThemeOptions["typography"] = {
  fontFamily,

  h1: {
    fontSize: "3rem",
    fontWeight: 700,
    lineHeight: 1.2,
    fontFamily,
  },
  h2: {
    fontSize: "2.25rem",
    fontWeight: 600,
    lineHeight: 1.3,
    fontFamily,
  },
  h3: {
    fontSize: "1.75rem",
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily,
  },
  h4: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: 1.4,
    fontFamily,
  },
  h5: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.5,
    fontFamily,
  },
  h6: {
    fontSize: "1rem",
    fontWeight: 500,
    lineHeight: 1.6,
    fontFamily,
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.75,
    fontFamily,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.57,
    fontFamily,
  },
  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    fontFamily,
  },
  body2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    fontFamily,
  },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "uppercase",
    fontFamily,
  },
  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    fontFamily,
  },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 400,
    textTransform: "uppercase",
    lineHeight: 2.66,
    fontFamily,
  },
};

export default typography;
