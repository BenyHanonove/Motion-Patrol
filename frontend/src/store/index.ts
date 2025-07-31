import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// Import slices
import alertReducer from "@slice/alert.slice";
import authReducer from "@slice/auth.slice";
import cameraReducer from "@slice/camera.slice";
import captureReducer from "@slice/capture.slice";
import snackbarReducer from "@slice/snackbar.slice";

// Combine reducers
const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  camera: cameraReducer,
  capture: captureReducer,
  snackbar: snackbarReducer,
});

// Persist config — exclude snackbar from persistence
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["snackbar"],
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor instance
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
