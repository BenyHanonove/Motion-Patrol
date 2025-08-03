import React, { useState } from "react";
import { Box, Button, MenuItem, Select } from "@mui/material";

// Import interfaces
import type { SettingsModel } from "@models/Settings.model";

// Import Redux utilities and snackbar actions for global notifications
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import providers
import SettingProvider from "@providers/setting.provider";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";
import MouseHoverPopover from "@components/common/MouseHoverPopover";

const MIN_WIDTH_TEXT = 120;

const languages: SettingsModel["language"][] = ["english", "hebrew"];
const themes: SettingsModel["theme"][] = ["light", "dark", "system"];
const motions: SettingsModel["motionLevel"][] = ["Low", "Medium", "High"];

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [settings, setSettings] = useState<SettingsModel>({
    ownerId: "id",
    language: "english",
    theme: "system",
    motionLevel: "Low",
  });

  const handleChange = <K extends keyof SettingsModel>(
    key: K,
    value: SettingsModel[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    const result = await SettingProvider.update(settings, "");
    if (result) {
      dispatch(
        showSnackbar({
          message: "Settings has been updated",
          severity: "success",
          duration: 3000,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Something went wrong. Could not update.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  const onReset = async () => {
    const result = await SettingProvider.reset("id", "token");
    if (result) {
      dispatch(
        showSnackbar({
          message: "Settings have been reset",
          severity: "success",
          duration: 3000,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Something went wrong. Could not reset.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  return (
    <PageLayout title="Settings">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <MouseHoverPopover
            title="Language"
            desc="Choose your preferred language for the app."
            titleMinWidth={MIN_WIDTH_TEXT}
          />
          <Select
            sx={{ minWidth: 100 }}
            value={settings.language}
            size="small"
            onChange={(e) =>
              handleChange(
                "language",
                e.target.value as SettingsModel["language"]
              )
            }
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang.slice(0, 3)}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <MouseHoverPopover
            title="Theme"
            desc="Choose your preferred display theme."
            titleMinWidth={MIN_WIDTH_TEXT}
          />
          <Select
            sx={{ minWidth: 100 }}
            value={settings.theme}
            size="small"
            onChange={(e) =>
              handleChange("theme", e.target.value as SettingsModel["theme"])
            }
          >
            {themes.map((theme) => (
              <MenuItem key={theme} value={theme}>
                {theme}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <MouseHoverPopover
            title="Motion detection"
            desc="Set motion detection sensitivity level."
            titleMinWidth={MIN_WIDTH_TEXT}
          />
          <Select
            sx={{ minWidth: 100 }}
            value={settings.motionLevel}
            size="small"
            onChange={(e) =>
              handleChange(
                "motionLevel",
                e.target.value as SettingsModel["motionLevel"]
              )
            }
          >
            {motions.map((motion) => (
              <MenuItem key={motion} value={motion}>
                {motion}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button color="info" variant="contained" onClick={() => onSubmit()}>
            Rest default
          </Button>
          <Button variant="contained" onClick={() => onReset()}>
            Save settings
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default SettingsPage;
