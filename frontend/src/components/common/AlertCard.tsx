import React from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";

// Import custom hooks
import useAppTheme from "@hooks/useAppTheme.hook";

// Import custom hooks
import type { AlertModel } from "@models/Alert.model";

// Import materiel ui icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import MinusIcon from "@mui/icons-material/Remove";

interface AlertCardProps {
  alert: AlertModel;
  onWatch: (alert: AlertModel) => Promise<void>;
  onRemove: (alert: AlertModel) => Promise<void>;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onWatch, onRemove }) => {
  const appTheme = useAppTheme();

  return (
    <Card
      key={alert.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        flex: 1,
      }}
    >
      <Typography>
        Alert from camera {alert.cameraId} at {alert.timestamp.toLocaleString()}
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        {alert.isWatched ? (
          <IconButton
            disabled
            sx={{
              borderRadius: 1,
              backgroundColor: appTheme.theme.palette.background.paper,
            }}
          >
            <MinusIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onWatch(alert)}
            sx={{
              borderRadius: 1,
              backgroundColor: appTheme.theme.palette.primary.main,
              color: "white",
              "&:focus": {
                backgroundColor: appTheme.theme.palette.primary.main,
              },
            }}
          >
            <CheckIcon />
          </IconButton>
        )}

        <IconButton
          onClick={() => onRemove(alert)}
          sx={{
            borderRadius: 1,
            backgroundColor: appTheme.theme.palette.error.main,
            color: "white",
            "&:focus": {
              backgroundColor: appTheme.theme.palette.error.main,
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default AlertCard;
