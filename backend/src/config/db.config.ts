import { SequelizeModuleOptions } from '@nestjs/sequelize';
import type { ModelCtor } from 'sequelize-typescript';
import { config as dotenvConfig } from 'dotenv';
import { models } from '@db/index';

dotenvConfig();

const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_DB_HOST!,
  port: parseInt(process.env.POSTGRES_DB_PORT!),
  username: process.env.POSTGRES_DB_USER_NAME!,
  password: process.env.POSTGRES_DB_PASSWORD!,
  database: process.env.POSTGRES_DB!,
  autoLoadModels: true,
  synchronize: true,
  models: models as ModelCtor[],
  logging: false,
};

export default sequelizeConfig;
