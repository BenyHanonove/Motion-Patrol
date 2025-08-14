import axios from "axios";

// Import interfaces
import {
  type ILoginModel,
  type AuthModel,
  type IRegisterModel,
  type IRestoreModel,
} from "@models";

// DEFINE BASE URL PATH FOR API
const BASE_URL = "https://localhost:3001/auth";

const AuthService = {
  // Registers a new user and returns a token string on success
  register: async (body: IRegisterModel): Promise<string | null> => {
    try {
      const response = await axios.post<string>(`${BASE_URL}/register`, body);
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Register failed:", error);
      return null;
    }
  },

  // Logs in the user and returns an AuthModel on success
  login: async (body: ILoginModel): Promise<AuthModel | null> => {
    try {
      const response = await axios.post<AuthModel>(`${BASE_URL}/login`, body);
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      return null;
    }
  },

  // Fetches the authenticated user based on token
  fetchAuth: async (token: string): Promise<AuthModel | null> => {
    try {
      const response = await axios.get<AuthModel>(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200 && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Fetch auth failed:", error);
      return null;
    }
  },

  // Sends a password restoration request to the server; returns true if successful
  restore: async (body: IRestoreModel): Promise<boolean> => {
    try {
      const response = await axios.post<string>(`${BASE_URL}/restore`, body);
      if (response.status === 200 && response.data) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Register failed:", error);
      return false;
    }
  },
};

export default AuthService;
