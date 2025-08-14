// Import interfaces

// Import icons
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PhotoCameraBackIcon from "@mui/icons-material/PhotoCameraBack";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

// Import redux store and actions
import { logout } from "../../../store/slice/auth.slice";
import { store } from "../../../store/index";

// Import interfaces
import type { SidebarItemModel } from "@interfaces/SidebarItem.model";

const primaryList: SidebarItemModel[] = [
  {
    title: "Cameras",

    path: "/dashboard/cameras",
    icon: <CameraAltIcon />,
  },
  {
    title: "Permissions",
    path: "/dashboard/permissions",
    icon: <LockPersonIcon />,
  },
];

const secondaryList: SidebarItemModel[] = [
  {
    title: "Alerts",
    path: "/dashboard/alerts",
    icon: <NotificationsIcon />,
  },
  {
    title: "Captures",
    path: "/dashboard/captures",
    icon: <PhotoCameraBackIcon />,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsIcon />,
  },
];

const finalList: SidebarItemModel[] = [
  {
    title: "Log out",
    path: "/auth/login",
    icon: <LogoutIcon />,
    onClick: () => {
      store.dispatch(logout());
    },
  },
];
export { primaryList, secondaryList, finalList };
