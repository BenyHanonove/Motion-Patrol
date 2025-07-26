import React from "react";
import { Snackbar, Alert } from "@mui/material";

// Import redux
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { hideSnackbar } from "../../store/slice/snackbar.slice";
import type { Dispatch } from "@reduxjs/toolkit";

const GlobalSnackbar: React.FC = () => {
  const dispatch: Dispatch = useAppDispatch();
  const { open, message, severity, duration } = useAppSelector(
    (state) => state.snackbar
  );

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      autoHideDuration={duration}
      onClose={() => dispatch(hideSnackbar())}
    >
      <Alert
        onClose={() => dispatch(hideSnackbar())}
        severity={severity}
        variant="filled"
        sx={{ color: "white", px: 2 }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
