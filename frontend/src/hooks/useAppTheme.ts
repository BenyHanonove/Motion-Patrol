import { useTheme } from "@mui/material/styles";

// Custom hook to access theme and common values
const useAppTheme = () => {
  const theme = useTheme();

  return {
    theme, // full theme object
    primaryColor: theme.palette.primary.main, // primary color
    isDarkMode: theme.palette.mode === "dark", // dark mode flag
    contrastText: theme.palette.primary.contrastText, // contrast text color
  };
};

export default useAppTheme;
