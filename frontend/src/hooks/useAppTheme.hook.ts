import { useTheme } from "@mui/material/styles";

// Custom hook to access theme and common values
const useAppTheme = () => {
  const theme = useTheme();

  return {
    theme,
    primaryColor: theme.palette.primary.main,
    isDarkMode: theme.palette.mode === "dark",
    contrastText: theme.palette.primary.contrastText,
  };
};

export default useAppTheme;
