import React from "react";
import { Box } from "@mui/material";

// Import interfaces
import type { AlertModel } from "@models/Alert.model";

// Import Redux utilities and snackbar actions for global notifications
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import providers
import AlertProvider from "@providers/alert.provider";

// Import custom components
import AlertCard from "@components/common/AlertCard";
import PageLayout from "@components/layouts/PageLayout";

const AlertsPage: React.FC = () => {
  const sampleAlert: AlertModel = {
    id: "alert-001",
    cameraId: "camera-123",
    timestamp: new Date(),
    isWatched: false,
  };

  // Initialize Redux dispatch function
  const dispatch = useAppDispatch();

  // Handles marking an alert as watched
  const watchAlert = async (alert: AlertModel) => {
    const res = await AlertProvider.watch(alert, "token");

    if (res) {
      dispatch(
        showSnackbar({
          message: "Alert marked as watched.",
          severity: "success",
          duration: 3000,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Failed to mark alert as watched.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  // Handles removing an alert
  const removeAlert = async (alert: AlertModel) => {
    const res = await AlertProvider.remove(alert, "token");

    if (res) {
      dispatch(
        showSnackbar({
          message: "Alert removed successfully.",
          severity: "success",
          duration: 3000,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Failed to remove alert.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  return (
    <PageLayout title="My Alerts">
      <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
        <AlertCard
          alert={sampleAlert}
          onWatch={watchAlert}
          onRemove={removeAlert}
        />
      </Box>
    </PageLayout>
  );
};

export default AlertsPage;
