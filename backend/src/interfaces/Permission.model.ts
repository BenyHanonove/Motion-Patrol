interface IPermissionModel {
  id: string;
  ownerId: string;
  motionOn: boolean;
  cameraOrder: string[];
}

export type { IPermissionModel };
