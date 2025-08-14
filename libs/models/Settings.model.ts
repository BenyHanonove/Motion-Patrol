export interface SettingsModel {
  ownerId: string;
  language: "english" | "hebrew";
  theme: "light" | "dark" | "system";
  motionLevel: "Low" | "Medium" | "High";
}
