// Import interfaces
import type { SettingsModel } from "@models";

// Import services
import SettingService from "@services/setting.service";

// Import Redux actions
import { set as setSetting } from "@slice/setting.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const SettingProvider = {
  fetch: async (token: string): Promise<boolean> => {
    const setting: SettingsModel | null = await SettingService.fetch(token);
    if (setting) {
      store.dispatch(setSetting(setting));
      return true;
    } else {
      return false;
    }
  },

  update: async (setting: SettingsModel, token: string): Promise<boolean> => {
    const isUpdated: boolean = await SettingService.update(setting, token);
    if (isUpdated) {
      store.dispatch(setSetting(setting));
      return true;
    } else {
      return false;
    }
  },

  reset: async (id: string, token: string): Promise<boolean> => {
    const setting: SettingsModel = {
      ownerId: id,
      language: "english",
      theme: "system",
      motionLevel: "Low",
    };

    const isUpdated: boolean = await SettingService.update(setting, token);
    if (isUpdated) {
      store.dispatch(setSetting(setting));
      return true;
    } else {
      return false;
    }
  },
};

export default SettingProvider;
