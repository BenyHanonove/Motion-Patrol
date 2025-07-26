import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { CameraModel } from "@models/Camera.model";

interface CamerasState {
  list: CameraModel[];
}

const initialState: CamerasState = {
  list: [],
};

const camerasSlice = createSlice({
  name: "cameras",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<CameraModel[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<CameraModel>) => {
      state.list.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((camera) => camera.id !== action.payload);
    },
  },
});

// Export action creators
export const { set, add, remove } = camerasSlice.actions;

// Export reducer for store configuration
export default camerasSlice.reducer;
