import React, { useState } from "react";
import { Box, IconButton, Switch, Typography } from "@mui/material";

// Import interfaces
import type { CameraModel } from "@models/Camera.model";
import type { PermissionModel } from "@models/Permission.mode";

// Import custom hooks
import useAppNavigation from "@hooks/useAppNavigation.hook";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";

// Import materiel ui icons
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import EditIcon from "@mui/icons-material/Edit";

const PermissionsPage: React.FC = () => {
  const AppNavigation = useAppNavigation();

  const camera1: CameraModel = {
    id: "cam001",
    ownerId: "user123",
    title: "Front Yard",
    streamUrl: "http://example.com/cam1.jpg",
  };

  const camera2: CameraModel = {
    id: "cam002",
    ownerId: "user123",
    title: "Back Yard",
    streamUrl: "http://example.com/cam2.jpg",
  };

  const camera3: CameraModel = {
    id: "cam003",
    ownerId: "user123",
    title: "Garage",
    streamUrl: "http://example.com/cam3.jpg",
  };

  const cameras: CameraModel[] = [camera1, camera2, camera3];

  // Display order based on camera IDs
  const cameraOrder: string[] = ["cam003", "cam001", "cam002"];

  const [motionState, setMotionState] = useState<boolean>(true);

  const permission: PermissionModel = {
    motionOn: motionState,
    cameraOrder,
  };

  const moveCamera = (camera: CameraModel, direction: "up" | "down") => {
    const index = permission.cameraOrder.indexOf(camera.id);
    if (index === -1) return; // Camera ID not found

    const newOrder = [...permission.cameraOrder];

    if (direction === "up" && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index - 1],
      ];
    }

    if (direction === "down" && index < newOrder.length - 1) {
      [newOrder[index + 1], newOrder[index]] = [
        newOrder[index],
        newOrder[index + 1],
      ];
    }

    // Update permission (if using state, you'd use setPermission)
    permission.cameraOrder = newOrder;

    console.log(newOrder);
  };

  return (
    <PageLayout title="Permission">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Camera priority queue with up/down controls and delete option */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>Motion patrol</Typography>
          <Switch
            checked={motionState}
            size="medium"
            onClick={() => {
              setMotionState(!motionState);
            }}
          />
        </Box>

        {/* Camera priority queue with up/down controls and delete option */}
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
                  <IconButton onClick={() => moveCamera(camera, "up")}>
                    <ArrowDropUpIcon />
                  </IconButton>
                  <IconButton onClick={() => moveCamera(camera, "down")}>
                    <ArrowDropDownIcon />
                  </IconButton>
                </Box>
                <Box>
                  <IconButton
                    onClick={() =>
                      AppNavigation.navigateToPath(`edit/camera/${camera.id}`)
                    }
                  >
                    <EditIcon />
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
      </Box>
    </PageLayout>
  );
};

export default PermissionsPage;
