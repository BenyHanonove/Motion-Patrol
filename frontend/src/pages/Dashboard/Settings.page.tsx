import React, { useState } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";
import MouseHoverPopover from "@components/common/MouseHoverPopover";

const MIN_WIDTH_TEXT = 120;

const SettingsPage: React.FC = () => {
  const languages: string[] = ["english", "hebrew"];
  const [language, setLanguage] = useState<string>(languages[0]);

  const themes: string[] = ["light", "dark", "system"];
  const [theme, setTheme] = useState<string>(themes[2]);

  const motions: string[] = ["Low", "Medium", "High"];
  const [motion, setMotion] = useState<string>(motions[0]);

  return (
    <PageLayout title="Settings">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <MouseHoverPopover
            title="Language"
            desc="Choose your preferred language for the app."
            titleMinWidth={MIN_WIDTH_TEXT}
          />
          <Select
            sx={{ minWidth: 100 }}
            value={language}
            size="small"
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
          >
            {languages.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item.trim().slice(0, 3)}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <MouseHoverPopover
            title="Theme"
            desc="Choose your preferred display theme."
            titleMinWidth={MIN_WIDTH_TEXT}
          />

          <Select
            sx={{ minWidth: 100 }}
            value={theme}
            size="small"
            onChange={(e) => {
              setTheme(e.target.value);
            }}
          >
            {themes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <MouseHoverPopover
            title="Motion detection"
            desc="Set motion detection sensitivity level."
            titleMinWidth={MIN_WIDTH_TEXT}
          />
          <Select
            sx={{ minWidth: 100 }}
            value={motion}
            size="small"
            onChange={(e) => {
              setMotion(e.target.value);
            }}
          >
            {motions.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box
          sx={{ display: "flex", flexDirection: "row", justifyContent: "end" }}
        >
          <Button variant="contained">Save settings</Button>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default SettingsPage;
