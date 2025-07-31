import React from "react";
import { GridLegacy as Grid } from "@mui/material";

// Import interfaces
import type { CaptureModel } from "@models/Capture.model";

// Import Redux utilities and snackbar actions for global notifications
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import providers
import CaptureProvider from "@providers/capture.provider";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";
import CaptureCard from "@components/common/CaptureCard";

const CapturesPage: React.FC = () => {
  const sampleCapture: CaptureModel = {
    id: "capture-001",
    cameraId: "camera-123",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGTjADuV9vuOIUaHyfA3TUQx9RgtBL6cYJSg&s",
    timestamp: new Date(),
  };

  const captureList = [
    sampleCapture,
    sampleCapture,
    sampleCapture,
    sampleCapture,
  ];

  const dispatch = useAppDispatch();

  const removeCapture = async (capture: CaptureModel) => {
    const res = await CaptureProvider.remove(capture, "token");

    if (res) {
      dispatch(
        showSnackbar({
          message: "Capture removed successfully.",
          severity: "success",
          duration: 3000,
        })
      );
    } else {
      dispatch(
        showSnackbar({
          message: "Failed to remove capture.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  const downloadCapture = async (capture: CaptureModel) => {
    try {
      const response = await fetch(capture.imageUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${capture.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      dispatch(
        showSnackbar({
          message: "Capture downloaded successfully.",
          severity: "success",
          duration: 3000,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showSnackbar({
          message: "Failed to download capture.",
          severity: "error",
          duration: 3000,
        })
      );
    }
  };

  return (
    <PageLayout title="My Captures">
      <Grid container>
        {captureList.map((capture, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${capture.id}-${index}`}>
            <CaptureCard
              capture={capture}
              onRemove={removeCapture}
              onDownload={downloadCapture}
            />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default CapturesPage;
