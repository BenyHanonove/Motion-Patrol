import axios from "axios";

// Import interfaces
import type { CameraModel, IRegisterCamera } from "@models/Camera.model";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/camera";

const CameraService = {
  // Adds a new camera to the backend
  add: async (
    body: IRegisterCamera,
    token: string
  ): Promise<CameraModel | null> => {
    try {
      const response = await axios.post<CameraModel>(`${BASE_URL}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Register failed:", error);
      return null;
    }
  },

  // Update camera information to the backend
  update: async (
    body: IRegisterCamera,
    token: string
  ): Promise<CameraModel | null> => {
    try {
      const response = await axios.put<CameraModel>(`${BASE_URL}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Update failed:", error);
      return null;
    }
  },

  // Removes a camera from the backend using DELETE with auth token
  remove: async (body: CameraModel, token: string): Promise<boolean> => {
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

  // Fetches all cameras for the authenticated user
  fetchAll: async (token: string): Promise<CameraModel[] | null> => {
    try {
      const response = await axios.get<CameraModel[]>(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Fetch cameras failed:", error);
      return null;
    }
  },
};

export default CameraService;
