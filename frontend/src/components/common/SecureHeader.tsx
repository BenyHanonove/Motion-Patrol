import React from "react";
import { Box, Typography } from "@mui/material";

// Import icons
import LockIcon from "@mui/icons-material/Lock";

// Import your logo
import Logo from "@assets/logo.svg?react";

// Import custom navigation hook
import useAppNavigation from "@hooks/useAppNavigation";

// Define props interface
interface SecureHeaderProps {
  text: string;
}

const SecureHeader: React.FC<SecureHeaderProps> = ({ text }) => {
  const { navigateToPath } = useAppNavigation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      {/* Logo section */}
      <Box onClick={() => navigateToPath("/")} sx={{ cursor: "pointer" }}>
        <Logo style={{ width: 80, height: 80, color: "yellow" }} />
      </Box>

      {/* Secure label (dynamic) */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <LockIcon />
        <Typography>{text}</Typography>
      </Box>
    </Box>
  );
};

export default SecureHeader;
