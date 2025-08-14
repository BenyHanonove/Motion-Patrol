import { config } from 'dotenv';
import { EEnvironmentEnums } from '@enum/environment.enum';

config();

export default (): Record<EEnvironmentEnums, string | number> => ({
  [EEnvironmentEnums.JWT_SECRET]: process.env.JWT_SECRET!,
  [EEnvironmentEnums.JWT_EXP_H]: process.env.JWT_EXP_H!,
  [EEnvironmentEnums.POSTGRES_DB_HOST]: process.env.POSTGRES_DB_HOST!,
  [EEnvironmentEnums.POSTGRES_DB_PORT]: parseInt(process.env.POSTGRES_DB_PORT!),
  [EEnvironmentEnums.POSTGRES_DB_USER_NAME]: process.env.POSTGRES_DB_USER_NAME!,
  [EEnvironmentEnums.POSTGRES_DB_PASSWORD]: process.env.POSTGRES_DB_PASSWORD!,
  [EEnvironmentEnums.POSTGRES_DB]: process.env.POSTGRES_DB!,
  [EEnvironmentEnums.BASE_URL]: process.env.BASE_URL!,
  [EEnvironmentEnums.PORT]: parseInt(process.env.BACKEND_PORT!),
});
