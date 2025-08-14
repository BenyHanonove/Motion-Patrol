import axios from "axios";

// Import interfaces
import type { CaptureModel } from "@models";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/caputre";

const CaptureService = {
  // Fetches all alerts for the authenticated user
  fetchAll: async (token: string): Promise<CaptureModel[] | null> => {
    try {
      const response = await axios.get<CaptureModel[]>(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Fetch captures failed:", error);
      return null;
    }
  },

  // Deletes a specific capture with authorization
  remove: async (body: CaptureModel, token: string): Promise<boolean> => {
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
};

export default CaptureService;
