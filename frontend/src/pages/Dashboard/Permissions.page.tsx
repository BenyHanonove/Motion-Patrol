import React, { useState } from "react";
import { Box } from "@mui/material";

// Import interfaces
import type { AlertTime } from "@models/Alert.model";
import type { CameraModel, IRegisterCamera } from "@models/Camera.model";

// Import form validator
import { validateCamera } from "@utils/cameraValidate";

// Redux
import { useAppDispatch } from "@hooks/redux.hook";
import { showSnackbar } from "@slice/snackbar.slice";

// Import custom components
import AddCamera from "@components/common/AddCamera";
import AlertPermission from "@components/common/AlertPermission";
import CameraManager from "@components/common/CameraManager";
import PageLayout from "@components/layouts/PageLayout";

const PermissionsPage: React.FC = () => {
  // Redux dispatch
  const dispatch = useAppDispatch();

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
    title: "Front Yard",
    streamUrl: "http://75.149.26.30:1024/cam_1.jpg?uniq=0.33135288353656145",
  };

  const [showForm, setShowForm] = useState<boolean>(false);

  const cameras = [exampleCamera, exampleCamera, exampleCamera];

  const [camera, setCamera] = useState<IRegisterCamera>({
    title: "",
    streamUrl: "",
  });

  const handelCameraForm = () => {
    const result = validateCamera(camera);
    if (!result.isValid) {
      // Show validation error
      dispatch(
        showSnackbar({
          message: Object.values(result.errors).join(", "),
          severity: "error",
          duration: 3000,
        })
      );
      return;
    }

    // Show success message
    dispatch(
      showSnackbar({
        message: "Camera added successfully.",
        severity: "success",
        duration: 3000,
      })
    );

    // Reset form
    setCamera({ title: "", streamUrl: "" });
  };

  return (
    <PageLayout title="Permission">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {/* Camera priority queue with up/down controls and delete option */}
        <CameraManager
          cameras={cameras}
          onRemove={() => {}}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
          openForm={() => {
            setShowForm(true);
          }}
        />
        {showForm && (
          <AddCamera
            state={camera}
            setState={setCamera}
            onSubmit={handelCameraForm}
          />
        )}
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
