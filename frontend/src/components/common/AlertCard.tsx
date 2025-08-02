import React from "react";
import { Card, Typography, Box, Button } from "@mui/material";

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
          <Button
            disabled
            sx={{
              borderRadius: 1,
            }}
          >
            <MinusIcon
              sx={{
                color: appTheme.theme.palette.text.primary,
              }}
            />
          </Button>
        ) : (
          <Button
            onClick={() => onWatch(alert)}
            sx={{
              borderRadius: 1,
              backgroundColor: appTheme.theme.palette.primary.main,
            }}
          >
            <CheckIcon
              sx={{
                color: appTheme.theme.palette.text.primary,
              }}
            />
          </Button>
        )}

        <Button
          onClick={() => onRemove(alert)}
          sx={{
            borderRadius: 1,
            backgroundColor: appTheme.theme.palette.error.main,
          }}
        >
          <DeleteIcon
            sx={{
              color: appTheme.theme.palette.text.primary,
            }}
          />
        </Button>
      </Box>
    </Card>
  );
};

export default AlertCard;
