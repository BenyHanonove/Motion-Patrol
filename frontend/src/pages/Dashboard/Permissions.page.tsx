import React, { useState } from "react";
import { Box } from "@mui/material";

// Import interfaces
import type { AlertTime } from "@models/Alert.model";
import type { CameraModel } from "@models/Camera.model";

// Import custom components
import AlertPermission from "@components/common/AlertPermission";
import CameraManager from "@components/common/CameraManager";
import PageLayout from "@components/layouts/PageLayout";

const PermissionsPage: React.FC = () => {
  // Toggles alert mode on/off
  const [on, setOn] = useState(true);
  const toggleOn = () => setOn(!on);

  const [startTime, setStartTime] = useState<AlertTime>({
    hour: 21,
    mins: 15,
  });
  const [endTime, setEndTime] = useState<AlertTime>({
    hour: 6,
    mins: 30,
  });

  const exampleCamera: CameraModel = {
    id: "cam123",
    ownerId: "user456",
    cameraName: "Front Yard",
    streamUrl: "http://75.149.26.30:1024/cam_1.jpg?uniq=0.33135288353656145",
  };

  const cameras = [exampleCamera, exampleCamera, exampleCamera];

  return (
    <PageLayout title="Permission">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Camera priority queue with up/down controls and delete option */}
        <CameraManager
          cameras={cameras}
          onRemove={() => {}}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
        />
        {/* Toggle alerts on/off and set active time range for cameras */}{" "}
        <AlertPermission
          show={on}
          setShow={toggleOn}
          start={startTime}
          setStart={setStartTime}
          end={endTime}
          setEnd={setEndTime}
        />
      </Box>
    </PageLayout>
  );
};

export default PermissionsPage;
