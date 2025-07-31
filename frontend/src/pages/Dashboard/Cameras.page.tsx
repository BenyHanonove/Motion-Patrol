import React from "react";
import { GridLegacy as Grid } from "@mui/material";

// Import interfaces
import type { CameraModel } from "@models/Camera.model";

// Import custom components
import CameraCard from "@components/common/CameraCard";
import PageLayout from "@components/layouts/PageLayout";

const CamerasPage: React.FC = () => {
  const exampleCamera: CameraModel = {
    id: "cam123",
    ownerId: "user456",
    cameraName: "Front Yard",
    streamUrl: "http://75.149.26.30:1024/cam_1.jpg?uniq=0.33135288353656145",
  };

  const cameras = [exampleCamera, exampleCamera, exampleCamera];

  return (
    <PageLayout title="My Cameras">
      <Grid container>
        {cameras.map((camera, index) => (
          <Grid item xs={12} sm={6} md={4} key={camera.id}>
            <CameraCard camera={camera} index={index} />
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default CamerasPage;
