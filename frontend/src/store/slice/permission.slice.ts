import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { PermissionModel } from "@models/Permission.mode";

const initialState: PermissionModel = {
  cameraOrder: [],
  motionOn: false,
};

const PermissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<PermissionModel>) => {
      state.motionOn = action.payload.motionOn;
      state.cameraOrder = action.payload.cameraOrder;
    },
  },
});

// Export action creators
export const { set } = PermissionSlice.actions;

// Export reducer for store configuration
export default PermissionSlice.reducer;
