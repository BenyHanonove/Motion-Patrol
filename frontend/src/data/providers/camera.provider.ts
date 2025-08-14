// Import interfaces
import type { CameraModel, IRegisterCamera } from "@models";

// Import services
import CameraService from "@services/camera.service";

// Import Redux actions
import {
  set as setCameras,
  add as addCamera,
  remove as removeCamera,
  update as updateCamera,
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
  add: async (camera: IRegisterCamera, token: string): Promise<boolean> => {
    const addedCamera: CameraModel | null = await CameraService.add(
      camera,
      token
    );
    if (addedCamera) {
      store.dispatch(addCamera(addedCamera));
      return true;
    } else {
      return false;
    }
  },

  // update information camera via API and dispatches it to Redux store
  update: async (camera: IRegisterCamera, token: string): Promise<boolean> => {
    const updated: CameraModel | null = await CameraService.update(
      camera,
      token
    );
    if (updated) {
      store.dispatch(updateCamera(updated));
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
