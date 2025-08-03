import axios from "axios";

// Import interfaces
import type { PermissionModel } from "@models/Permission.mode";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/premisson";

const PermissionService = {
  // Fetch permission from the backend
  fetch: async (token: string): Promise<PermissionModel | null> => {
    try {
      const response = await axios.get<PermissionModel>(BASE_URL, {
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

  // Update permission to the backend
  update: async (body: PermissionModel, token: string): Promise<boolean> => {
    try {
      const response = await axios.put(BASE_URL, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      console.error("Update settings failed:", error);
      return false;
    }
  },
};

export default PermissionService;
