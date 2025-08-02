interface CameraModel {
  id: string;
  ownerId: string;
  title: string;
  streamUrl: string;
}

interface IRegisterCamera {
  title: string;
  streamUrl: string;
}

export type { CameraModel, IRegisterCamera };
