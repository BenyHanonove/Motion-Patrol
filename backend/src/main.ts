import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { InitApplication } from '@config/init.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  InitApplication(app);

  const port = parseInt(process.env.BACKEND_PORT || '3000', 10);
  await app.listen(port);
  console.log(`HTTP server running on port ${port}`);
}

void bootstrap();
