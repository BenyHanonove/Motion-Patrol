import { Route } from "react-router-dom";

// Import layout
import DashboardLayout from "@components/layouts/DashboardLayout";

// Import pages
import AlertsPage from "@pages/Dashboard/Alerts.page";
import CamerasPage from "@pages/Dashboard/Cameras.page";
import CapturesPage from "@pages/Dashboard/Captures.page";
import PermissionsPage from "@pages/Dashboard/Permissions.page";
import SettingsPage from "@pages/Dashboard/Settings.page";

const DashboardRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route index element={<CamerasPage />} />
    <Route path="alerts" element={<AlertsPage />} />
    <Route path="cameras" element={<CamerasPage />} />
    <Route path="captures" element={<CapturesPage />} />
    <Route path="permissions" element={<PermissionsPage />} />
    <Route path="settings" element={<SettingsPage />} />
  </Route>
);

export default DashboardRoutes;
