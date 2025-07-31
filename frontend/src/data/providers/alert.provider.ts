// Import interfaces
import type { AlertModel } from "@models/Alert.model";

// Import services
import AlertService from "@services/alert.service";

// Import Redux actions
import {
  set as setAlerts,
  remove as removeAlert,
  watch as watchAlert,
} from "@slice/alert.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const AlertProvider = {
  // Fetches all alerts from API and updates Redux store
  fetchAll: async (token: string): Promise<boolean> => {
    const alerts: AlertModel[] | null = await AlertService.fetchAll(token);
    if (alerts?.length) {
      store.dispatch(setAlerts(alerts));
      return true;
    } else {
      return false;
    }
  },

  // Updates an alert's watched status via API and Redux store
  watch: async (alert: AlertModel, token: string): Promise<boolean> => {
    const response: boolean = await AlertService.watch(alert, token);
    if (response) {
      store.dispatch(watchAlert(alert));
      return true;
    } else {
      return false;
    }
  },

  // Removes a specific alert via API and Redux store
  remove: async (alert: AlertModel, token: string): Promise<boolean> => {
    const isRemoved: boolean = await AlertService.remove(alert, token);
    if (isRemoved) {
      store.dispatch(removeAlert(alert));
      return true;
    } else {
      return false;
    }
  },

  // Removes all alerts via API and clears Redux store
  removeAll: async (token: string): Promise<boolean> => {
    const isRemoved: boolean = await AlertService.removeAll(token);
    if (isRemoved) {
      store.dispatch(setAlerts([]));
      return true;
    } else {
      return false;
    }
  },
};

export default AlertProvider;
