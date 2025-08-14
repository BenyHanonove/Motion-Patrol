export interface ISettingsModel {
  id: string;
  ownerId: string;
  language: 'english' | 'hebrew';
  theme: 'light' | 'dark' | 'system';
  motionLevel: 'Low' | 'Medium' | 'High';
}

export interface ISettingRequest {
  id: string;
  language: 'english' | 'hebrew';
  theme: 'light' | 'dark' | 'system';
  motionLevel: 'Low' | 'Medium' | 'High';
}
