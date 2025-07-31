import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { AlertModel } from "@models/Alert.model";

interface AlertsState {
  list: AlertModel[];
}

const initialState: AlertsState = {
  list: [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<AlertModel[]>) => {
      state.list = action.payload;
    },
    remove: (state, action: PayloadAction<AlertModel>) => {
      state.list = state.list.filter((alert) => alert.id !== action.payload.id);
    },
    watch: (state, action: PayloadAction<AlertModel>) => {
      const alert = state.list.find((a) => a.id === action.payload.id);
      if (alert) alert.isWatched = true;
    },
  },
});

// Export action creators
export const { set, remove, watch } = alertsSlice.actions;

// Export reducer for store configuration
export default alertsSlice.reducer;
