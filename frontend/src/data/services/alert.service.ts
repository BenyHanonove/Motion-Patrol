import axios from "axios";

// Import interfaces
import type { AlertModel } from "@models/Alert.model";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/alert";

const AlertService = {
  // Fetches all alerts for the authenticated user
  fetchAll: async (token: string): Promise<AlertModel[] | null> => {
    try {
      const response = await axios.get<AlertModel[]>(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Fetch alerts failed:", error);
      return null;
    }
  },

  // Updates an alert's watched status with authorization
  watch: async (body: AlertModel, token: string): Promise<boolean> => {
    try {
      const response = await axios.put(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      });

      if (response.status === 200) return true;
      else return false;
    } catch (error) {
      console.error("Delete failed:", error);
      return false;
    }
  },

  // Deletes a specific alert with authorization
  remove: async (body: AlertModel, token: string): Promise<boolean> => {
    try {
      const response = await axios.delete(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      });

      if (response.status === 204) return true;
      else return false;
    } catch (error) {
      console.error("Delete failed:", error);
      return false;
    }
  },

  // Deletes all alerts for the authenticated user
  removeAll: async (token: string): Promise<boolean> => {
    try {
      const response = await axios.delete(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 204 && response.data) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Fetch cameras failed:", error);
      return false;
    }
  },
};

export default AlertService;
