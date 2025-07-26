import { Route, Navigate } from "react-router-dom";

// Import pages
import LoginPage from "@pages/Auth/Login.page";
import RegisterPage from "@pages/Auth/Register.page";
import RestorePasswordPage from "@pages/Auth/RestorePassword.page";

const AuthRoutes = (
  <>
    <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
    <Route path="/auth/login" element={<LoginPage />} />
    <Route path="/auth/register" element={<RegisterPage />} />
    <Route path="/auth/forgot-password" element={<RestorePasswordPage />} />
  </>
);

export default AuthRoutes;
