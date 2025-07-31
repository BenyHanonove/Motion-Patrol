import React from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";

// Import interfaces
import type { AlertTime } from "@models/Alert.model";

// Define props interface
interface AlertPermissionProps {
  show: boolean;
  setShow: () => void;
  start: AlertTime;
  end: AlertTime;
  setStart: React.Dispatch<React.SetStateAction<AlertTime>>;
  setEnd: React.Dispatch<React.SetStateAction<AlertTime>>;
}

const AlertPermission: React.FC<AlertPermissionProps> = ({
  show,
  setShow,
  end,
  start,
  setStart,
  setEnd,
}) => {
  // Arrays for selectable hours (0–23) and minutes (0, 15, 30, 45)
  const minsArray: number[] = [0, 15, 30, 45];
  const hoursArray: number[] = Array.from({ length: 24 }, (_, i) => i);

  const renderTimePicker = (
    label: string,
    time: AlertTime,
    setTime: React.Dispatch<React.SetStateAction<AlertTime>>
  ) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Box sx={{ minWidth: 100 }}>
        <Typography variant="h6">{label}</Typography>
      </Box>
      <Select
        value={time.hour}
        size="small"
        onChange={(e) => {
          setTime({ ...time, hour: e.target.value });
        }}
      >
        {hoursArray.map((h) => (
          <MenuItem key={h} value={h}>
            {h.toString().padStart(2, "0")}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={time.mins}
        size="small"
        onChange={(e) => {
          setTime({ ...time, mins: e.target.value });
        }}
      >
        {minsArray.map((m) => (
          <MenuItem key={m} value={m}>
            {m.toString().padStart(2, "0")}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5">Alert Mode</Typography>
        <Switch checked={show} onChange={setShow} />
      </Box>

      {show && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 5,
              flex: 1,
            }}
          >
            {renderTimePicker("Start Time", start, setStart)}
            {renderTimePicker("End Time", end, setEnd)}{" "}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
              flex: 1,
            }}
          >
            <Button variant="contained">Update</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AlertPermission;
