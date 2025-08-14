// Import interfaces
import type { PermissionModel } from "@models";

// Import services
import PermissionService from "@services/permission.service";

// Import Redux actions
import { set as setPermission } from "@slice/permission.slice";

// Import Redux store or dispatch hook
import { store } from "@store";

const PermissionProvider = {
  // Fetch permission and update Redux
  fetch: async (token: string): Promise<boolean> => {
    const permission: PermissionModel | null = await PermissionService.fetch(
      token
    );
    if (permission) {
      store.dispatch(setPermission(permission));
      return true;
    } else {
      return false;
    }
  },

  // Update permission and sync Redux
  update: async (
    permission: PermissionModel,
    token: string
  ): Promise<boolean> => {
    const isUpdated: boolean = await PermissionService.update(
      permission,
      token
    );
    if (isUpdated) {
      store.dispatch(setPermission(permission));
      return true;
    } else {
      return false;
    }
  },
};

export default PermissionProvider;
