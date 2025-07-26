import React from "react";
import { Container, Box } from "@mui/material";

// Import custom components
import Camera from "@components/common/Camera";
import PageTitle from "@components/common/PageTitle";

// Import typed Redux selector hook to access camera state
import { useAppSelector } from "@hooks/redux";

const CamerasPage: React.FC = () => {
  // Get camera list from Redux store
  const cameras = useAppSelector((state) => state.camera.list);

  return (
    <Container>
      <PageTitle text="My Cameras" />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {cameras.map((camera, index) => (
          <Box key={camera.cameraName}>
            <Camera camera={camera} index={index} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CamerasPage;
