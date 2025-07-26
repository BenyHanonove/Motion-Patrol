import React, { useRef } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { Box, Typography, Card, CardContent, IconButton } from "@mui/material";

// Import interfaces
import type { CameraModel } from "@models/Camera.model";

interface CameraProps {
  camera: CameraModel;
  index: number;
}

const Camera: React.FC<CameraProps> = ({ camera, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen().catch((err) => {
          console.error("Failed to enable fullscreen", err);
        });
      }
    }
  };

  return (
    <Card
      sx={{
        flex: 1,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {`${camera.cameraName} (Camera #${index + 1})`}
          </Typography>
          <IconButton onClick={handleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Box>

        {/* Embed live image stream */}
        <Box
          ref={containerRef}
          sx={{
            width: "100%",
            aspectRatio: "16 / 9",
            display: "flex",
          }}
        >
          <img
            src={camera.streamUrl}
            alt={`${camera.cameraName} feed`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Camera;
