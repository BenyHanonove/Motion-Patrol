import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

// Initializes global middleware and settings for the NestJS application
export const InitApplication = (app: INestApplication) => {
  // Enable CORS with standard HTTP methods
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Enable cookie parsing
  app.use(cookieParser());

  // Set global API route prefix
  app.setGlobalPrefix('api/v1');
};
