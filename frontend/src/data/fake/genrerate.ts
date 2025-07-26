import { v4 as uuidv4 } from "uuid";
import type { CameraModel } from "../models/Camera.model";

const generateCameras = (amount: number): CameraModel[] => {
  const streamUrl =
    "http://38.79.156.188/CgiStart/nphMotionJpeg?Resolution=640x480";

  const cameraNames = [
    "Front Door",
    "Backyard",
    "Garage",
    "Living Room",
    "Entrance",
    "Side Alley",
    "Driveway",
    "Office",
    "Lobby",
    "Storage",
  ];

  return Array.from({ length: amount }, (_, index) => ({
    id: uuidv4(),
    ownerId: uuidv4(),
    cameraName: cameraNames[index % cameraNames.length],
    streamUrl,
  }));
};

export { generateCameras };
