interface ICameraModel {
  id: string;
  ownerId: string;
  title: string;
  streamUrl: string;
}

interface IRegisterCamera {
  title: string;
  streamUrl: string;
}

export type { ICameraModel, IRegisterCamera };
