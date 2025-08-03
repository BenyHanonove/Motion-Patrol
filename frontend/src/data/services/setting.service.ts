import axios from "axios";

// Import interfaces
import type { SettingsModel } from "@models/Settings.model";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/setting";

const SettingService = {
  // fetch settings from the backend
  fetch: async (token: string): Promise<SettingsModel | null> => {
    try {
      const response = await axios.get<SettingsModel>(BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200 ? response.data : null;
    } catch (error) {
      console.error("Get settings failed:", error);
      return null;
    }
  },

  // Update settings on the backend
  update: async (body: SettingsModel, token: string): Promise<boolean> => {
    try {
      const response = await axios.put(BASE_URL, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 204;
    } catch (error) {
      console.error("Update settings failed:", error);
      return false;
    }
  },
};

export default SettingService;
