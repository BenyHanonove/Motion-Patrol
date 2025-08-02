import type { IRegisterCamera } from "@models/Camera.model";

// Correct generic return type for camera validation
interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof IRegisterCamera, string>>;
}

export function validateCamera(data: IRegisterCamera): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!data.title.trim()) {
    errors.title = "Camera title is required";
  }

  if (!data.streamUrl.trim()) {
    errors.streamUrl = "Stream URL is required";
  } else {
    try {
      new URL(data.streamUrl); // throws if not valid
    } catch {
      errors.streamUrl = "Invalid URL format";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
