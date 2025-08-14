// Re-import them individually for the array
import { AuthEntity } from './entities/auth.entity';
import { AlertEntity } from './entities/alert.entity';
import { CameraEntity } from './entities/camera.entity';
import { CaptureEntity } from './entities/capture.entity';
import { PermissionEntity } from './entities/permission.entity';
import { SettingsEntity } from './entities/settings.entity';

// Export array of all models
export const models = [
  AuthEntity,
  AlertEntity,
  CameraEntity,
  CaptureEntity,
  PermissionEntity,
  SettingsEntity,
];
