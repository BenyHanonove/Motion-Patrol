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

    update: (state, action: PayloadAction<CameraModel>) => {
      const camera = state.list.find((c) => c.id === action.payload.id);
      if (camera) {
        camera.title = action.payload.title;
        camera.streamUrl = action.payload.streamUrl;
      }
    },
    remove: (state, action: PayloadAction<CameraModel>) => {
      state.list = state.list.filter(
        (camera) => camera.id !== action.payload.id
      );
    },
  },
});

// Export action creators
export const { set, add, update, remove } = camerasSlice.actions;

// Export reducer for store configuration
export default camerasSlice.reducer;
