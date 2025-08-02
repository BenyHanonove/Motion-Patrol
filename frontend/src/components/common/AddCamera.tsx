import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

// Import custom hooks
import useAppTheme from "@hooks/useAppTheme.hook";

// Import interfaces
import type { IRegisterCamera } from "@models/Camera.model";

interface AddCameraProps {
  state: IRegisterCamera;
  setState: React.Dispatch<React.SetStateAction<IRegisterCamera>>;
  onSubmit: () => void;
}

const AddCamera: React.FC<AddCameraProps> = ({ state, setState, onSubmit }) => {
  const appTheme = useAppTheme();

  return (
    <Box
      sx={{
        position: "absolute",
        height: "100vh",
        width: "100vw",
        top: 0,
        left: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: appTheme.theme.palette.background.default,
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
            value={state.title}
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
          />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography>Camera Url</Typography>
          <TextField
            value={state.streamUrl}
            onChange={(e) => {
              setState({ ...state, streamUrl: e.target.value });
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
  );
};

export default AddCamera;
