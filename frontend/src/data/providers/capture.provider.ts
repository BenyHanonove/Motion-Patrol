// Import interfaces
import type { CaptureModel } from "@models";

// Import services
import CaptureService from "@services/capture.service";

// Import Redux actions
import {
  set as setCaptures,
  remove as removeCapture,
} from "@slice/capture.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const CaptureProvider = {
  // Fetches all captures from API and updates Redux store
  fetchAll: async (token: string): Promise<boolean> => {
    const captures: CaptureModel[] | null = await CaptureService.fetchAll(
      token
    );
    if (captures?.length) {
      store.dispatch(setCaptures(captures));
      return true;
    } else {
      return false;
    }
  },

  // Removes a specific capture via API and Redux store
  remove: async (capture: CaptureModel, token: string): Promise<boolean> => {
    const isRemoved: boolean = await CaptureService.remove(capture, token);
    if (isRemoved) {
      store.dispatch(removeCapture(capture));
      return true;
    } else {
      return false;
    }
  },
};

export default CaptureProvider;
