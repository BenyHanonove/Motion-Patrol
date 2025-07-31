import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { CaptureModel } from "@models/Capture.model";

interface CaptureState {
  list: CaptureModel[];
}

const initialState: CaptureState = {
  list: [],
};

const captureSlice = createSlice({
  name: "capture",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CaptureModel[]>) => {
      state.list = action.payload;
    },
    remove: (state, action: PayloadAction<CaptureModel>) => {
      state.list = state.list.filter((alert) => alert.id !== action.payload.id);
    },
  },
});

// Export action creators
export const { set, remove } = captureSlice.actions;

// Export reducer for store configuration
export default captureSlice.reducer;
