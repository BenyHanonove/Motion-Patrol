interface IAlertModel {
  id: string;
  ownerId: string;
  cameraId: string;
  timestamp: Date;
  isWatched: boolean;
  isMotion: boolean;
  time: {
    start: IAlertTime;
    end: IAlertTime;
  };
}

interface IAlertTime {
  hour: number;
  mins: number;
}

export type { IAlertModel, IAlertTime };
