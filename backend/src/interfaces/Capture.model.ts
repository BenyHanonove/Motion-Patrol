interface ICaptureModel {
  id: string;
  ownerId: string;
  cameraId: string;
  imageUrl: string;
  timestamp: Date;
}

export type { ICaptureModel };
