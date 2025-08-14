interface AlertModel {
  id: string;
  cameraId: string;
  timestamp: Date;
  isWatched: boolean;
  isMotion: boolean;
  time: {
    start: AlertTime;
    end: AlertTime;
  };
}

interface AlertTime {
  hour: number;
  mins: number;
}

export type { AlertModel, AlertTime };
