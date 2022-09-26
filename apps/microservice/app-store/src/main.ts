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
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || ApplicationConfig.APP_STORE.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 APP STORE-MICROSERVICE Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
