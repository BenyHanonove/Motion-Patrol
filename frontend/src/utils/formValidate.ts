// Import interfaces
import type {
  ILoginModel,
  IRegisterModel,
  IRestoreModel,
} from "@models/Auth.model";

// Generic return type for validation
interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof ILoginModel | keyof IRegisterModel, string>>;
}

// Basic email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Login validator
export function validateLogin(data: ILoginModel): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  if (!data.password.trim()) {
    errors.password = "Password is required";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Register validator
export function validateRegister(data: IRegisterModel): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  const loginValidation = validateLogin(data);
  Object.assign(errors, loginValidation.errors);

  if (!data.config.trim()) {
    errors.config = "Please confirm your password";
  } else if (data.config !== data.password) {
    errors.config = "Passwords do not match";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

// Restore validator
export function validateRestore(data: IRestoreModel): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    errors.email = "Invalid email format";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}
