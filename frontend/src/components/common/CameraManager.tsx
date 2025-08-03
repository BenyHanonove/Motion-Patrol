import React from "react";
import { Box, IconButton, Typography } from "@mui/material";

// Import interfaces
import type { CameraModel } from "@models/Camera.model";

// Import materiel ui icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditICon from "@mui/icons-material/Edit";

interface CameraManagerProps {
  cameras: CameraModel[];
  onRemove: (camera: CameraModel) => void;
  onMoveUp: (camera: CameraModel) => void;
  onMoveDown: (camera: CameraModel) => void;
}

const CameraManager: React.FC<CameraManagerProps> = ({
  cameras,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5">Camera Manager</Typography>

      {cameras.map((camera) => (
        <Box
          key={camera.id}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
            alignItems: "center",
          }}
        >
          <Typography>{camera.title}</Typography>

          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box>
              <IconButton onClick={() => onMoveUp(camera)}>
                <ArrowDropUpIcon />
              </IconButton>
              <IconButton onClick={() => onMoveDown(camera)}>
                <ArrowDropDownIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => onRemove(camera)}>
                <EditICon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          flex: 1,
        }}
      ></Box>
    </Box>
  );
};

export default CameraManager;
