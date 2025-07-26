import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SnackbarSeverity = "success" | "info" | "warning" | "error";

interface SnackbarState {
  open: boolean;
  message: string;
  severity: SnackbarSeverity;
  duration: number;
}

const initialState: SnackbarState = {
  open: false,
  message: "",
  severity: "info",
  duration: 3000,
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        severity?: SnackbarSeverity;
        duration?: number;
      }>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
      state.duration = action.payload.duration || 3000;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

// Export action creators
export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;

// Export reducer for store configuration
export default snackbarSlice.reducer;
