import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { SettingsModel } from "@models/Settings.model";

const initialState: SettingsModel = {
  ownerId: "",
  language: "english",
  theme: "system",
  motionLevel: "Low",
};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<SettingsModel>) => {
      state.language = action.payload.language;
      state.theme = action.payload.theme;
      state.motionLevel = action.payload.motionLevel;
    },
  },
});

// Export action creators
export const { set } = SettingSlice.actions;

// Export reducer for store configuration
export default SettingSlice.reducer;
