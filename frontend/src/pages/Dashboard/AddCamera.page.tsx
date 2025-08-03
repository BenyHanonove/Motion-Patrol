import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

// Import interfaces
import type { IRegisterCamera } from "@models/Camera.model";

// Import form validator
import { validateCamera } from "@utils/cameraValidate";

// Import Redux utilities and snackbar actions for global notifications
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import providers
import CameraProvider from "@providers/camera.provider";

// Import custom components
import PageLayout from "@components/layouts/PageLayout";

const AddCameraPage: React.FC = () => {
  // Redux dispatch
  const dispatch = useAppDispatch();

  const [camera, setCamera] = useState<IRegisterCamera>({
    title: "",
    streamUrl: "",
  });

  const onSubmit = async () => {
    const result = validateCamera(camera);

    if (!result.isValid) {
      dispatch(
        showSnackbar({
          message: Object.values(result.errors).join(", "),
          severity: "error",
          duration: 3000,
        })
      );
      return;
    }

    const response = await CameraProvider.add(camera, "token");

    if (!response) {
      dispatch(
        showSnackbar({
          message: "Failed to add camera.",
          severity: "error",
          duration: 3000,
        })
      );
      return;
    }

    dispatch(
      showSnackbar({
        message: "Camera added successfully.",
        severity: "success",
        duration: 3000,
      })
    );

    setCamera({ title: "", streamUrl: "" });
  };

  return (
    <PageLayout title="Add camera">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: 2,
            p: 6,
            zIndex: 11,
          }}
        >
          <Typography>Add new camera</Typography>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography>Title</Typography>
            <TextField
              value={camera.title}
              onChange={(e) => {
                setCamera({ ...camera, title: e.target.value });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography>Camera Url</Typography>
            <TextField
              value={camera.streamUrl}
              onChange={(e) => {
                setCamera({ ...camera, streamUrl: e.target.value });
              }}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button variant="contained" onClick={onSubmit}>
              Add
            </Button>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AddCameraPage;
