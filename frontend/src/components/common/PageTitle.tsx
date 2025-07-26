import React from "react";
import { Box, Typography } from "@mui/material";

// Define props interface
interface PageTitleProps {
  text: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ text }) => {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Typography variant="h2">{text}</Typography>
    </Box>
  );
};

export default PageTitle;
