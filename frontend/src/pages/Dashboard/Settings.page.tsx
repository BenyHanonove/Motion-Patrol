import React, { useState } from "react";
import { Box, MenuItem, Select } from "@mui/material";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";

const SettingsPage: React.FC = () => {
  const languages = ["english", "hebrew"];
  const [language, setLanguage] = useState<string>(languages[0]);

  return (
    <PageLayout>
      <Box>
        <Select
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
    </PageLayout>
  );
};

export default SettingsPage;
