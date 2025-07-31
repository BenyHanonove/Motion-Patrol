// Import interfaces
import type { CameraModel } from "@models/Camera.model";

// Import services
import CameraService from "src/data/services/camera.service";

// Import Redux actions
import {
  set as setCameras,
  add as addCamera,
  remove as removeCamera,
} from "@slice/camera.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const CameraProvider = {
  // Fetches all cameras from the backend and updates Redux store
  fetchAll: async (token: string): Promise<boolean> => {
    const cameras: CameraModel[] | null = await CameraService.fetchAll(token);
    if (cameras?.length) {
      store.dispatch(setCameras(cameras));
      return true;
    } else {
      return false;
    }
  },

  // Adds a new camera via API and dispatches it to Redux store
  add: async (camera: CameraModel): Promise<boolean> => {
    const addedCamera: CameraModel | null = await CameraService.add(camera);
    if (addedCamera) {
      store.dispatch(addCamera(addedCamera));
      return true;
    } else {
      return false;
    }
  },

  // Removes a camera via API and updates Redux store
  remove: async (camera: CameraModel, token: string): Promise<boolean> => {
    const isRemoved: boolean = await CameraService.remove(camera, token);
    if (isRemoved) {
      store.dispatch(removeCamera(camera));
      return true;
    } else {
      return false;
    }
  },
};

export default CameraProvider;
