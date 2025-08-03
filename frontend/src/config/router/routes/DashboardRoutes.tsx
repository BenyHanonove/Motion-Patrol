import { Route } from "react-router-dom";

// Import layout
import DashboardLayout from "@components/layouts/DashboardLayout";

// Import pages
import AddCameraPage from "@pages/Dashboard/AddCamera.page";
import AlertsPage from "@pages/Dashboard/Alerts.page";
import EditCameraPage from "@pages/Dashboard/EditCamera.page";
import CamerasPage from "@pages/Dashboard/Cameras.page";
import CapturesPage from "@pages/Dashboard/Captures.page";
import PermissionsPage from "@pages/Dashboard/Permissions.page";
import SettingsPage from "@pages/Dashboard/Setting.page";

const DashboardRoutes = (
  <Route path="/dashboard" element={<DashboardLayout />}>
    <Route path="addCamera" element={<AddCameraPage />} />
    <Route path="permissions/edit/camera/:id" element={<EditCameraPage />} />
    <Route path="alerts" element={<AlertsPage />} />
    <Route path="captures" element={<CapturesPage />} />
    <Route path="cameras" element={<CamerasPage />} />
    <Route path="permissions" element={<PermissionsPage />} />
    <Route path="settings" element={<SettingsPage />} />
    <Route index element={<CamerasPage />} />
  </Route>
);

export default DashboardRoutes;
