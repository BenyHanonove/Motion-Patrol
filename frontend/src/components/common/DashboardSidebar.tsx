import React, { useState } from "react";
import {
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  useMediaQuery,
  Box,
} from "@mui/material";

// Import materiel ui icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Import custom hooks
import useAppTheme from "@hooks/useAppTheme.hook";
import useAppNavigation from "@hooks/useAppNavigation.hook";

// Import sidebar lists
import {
  primaryList,
  secondaryList,
  finalList,
} from "../../config/sidebar/index";

// Import interfaces
import type { SidebarItemModel } from "@models/SidebarItem";

const DashboardSidebar: React.FC = () => {
  // Load app navigation hook
  const { navigateToPath } = useAppNavigation();

  // Load app theme hook
  const appTheme = useAppTheme();

  // define mobile size and state manger
  const isMobile = useMediaQuery(appTheme.theme.breakpoints.down("lg"));
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggles mobile drawer open state
  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  // Handles item click with navigation and mobile close
  const handleClick = (item: SidebarItemModel) => {
    if (item.disabled) return;
    if (item.onClick) item.onClick();
    navigateToPath(item.path);
    if (isMobile) setMobileOpen(false);
  };

  // Renders a sidebar list from given items
  const renderList = (list: SidebarItemModel[]) => (
    <List>
      {list.map((item) => (
        <ListItem key={item.title} disablePadding>
          <ListItemButton
            onClick={() => handleClick(item)}
            disabled={item.disabled}
          >
            {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const drawerContent = (
    <Box sx={{ px: 2 }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          MOTION PATROL
        </Typography>
      </Toolbar>
      <Divider />
      {renderList(primaryList)}
      <Divider />
      {renderList(secondaryList)}
      <Divider />
      {renderList(finalList)}
    </Box>
  );

  return (
    // Wrapper with background
    <Box>
      {/* Mobile hamburger toggle */}
      {isMobile && (
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              transition: "transform 0.3s ease",
              transform: mobileOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Toolbar>
      )}

      {/* Sidebar content */}
      <Box
        sx={{
          display: isMobile && !mobileOpen ? "none" : "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        {drawerContent}
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
