/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationConfig } from '@openhmis-api/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = 'hipu';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || ApplicationConfig.HIPU_API.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 HIPU  Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
