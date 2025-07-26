import { useEffect, useState, type ReactNode } from "react";

// Import theme and materiel ui providers
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "@theme";

type RootProps = {
  children: ReactNode;
};

export default function Root({ children }: RootProps) {
  const [themeMode, setThemeMode] = useState<boolean | null>(null);

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    setThemeMode(systemTheme.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setThemeMode(event.matches);
    };

    systemTheme.addEventListener("change", handleChange);

    return () => {
      systemTheme.removeEventListener("change", handleChange);
    };
  }, []);

  if (themeMode === null) return null;

  return (
    <ThemeProvider theme={themeMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
