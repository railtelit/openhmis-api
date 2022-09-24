/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ApplicationConfig } from '@openhmis-api/config';

import { PatientStoreAppModule } from './app/app.module';

async function bootstrap() {
  console.log(process.env)
  const port = process.env.PORT || ApplicationConfig.PATIENT_STORE.PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(PatientStoreAppModule,{
      options:{ host:ApplicationConfig.DEFAULT.LISTEN_HOST, port  }
  });
  const globalPrefix = 'api';
  // app.setGlobalPrefix(globalPrefix);
  await app.listen();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
