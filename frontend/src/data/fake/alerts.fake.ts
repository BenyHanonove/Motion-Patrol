import { v4 as uuidv4 } from "uuid";
import { type AlertModel } from "@models/Alert.model";

export function generateAlert(
  overrides?: Partial<AlertModel>,
  num: number = 1
): AlertModel[] {
  const array: AlertModel[] = [];

  for (let i = 0; i < num; i++) {
    array.push({
      id: uuidv4(),
      cameraId: "default-camera-id",
      timestamp: new Date(),
      isWatched: false,
      ...overrides,
    });
  }

  return array;
}
