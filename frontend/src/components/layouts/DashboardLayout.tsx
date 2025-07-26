import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import DashboardSidebar from "@components/common/DashboardSidebar";

const DashboardLayout: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Box sx={{ flex: { xs: 1, lg: 2 } }}>
        <DashboardSidebar />
      </Box>
      <Box component="main" sx={{ flex: { xs: 1, lg: 10 } }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
