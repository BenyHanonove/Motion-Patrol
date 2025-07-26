import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Import routers
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

// Import not found page
import NotFoundPage from "@pages/NotFound.page";

import { selectIsAuthenticated } from "../../store/slice/auth.slice";
import { useSelector } from "react-redux";

export const AppRouter = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard/cameras" : "/auth/login"}
              replace
            />
          }
        />

        {AuthRoutes}
        {DashboardRoutes}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
