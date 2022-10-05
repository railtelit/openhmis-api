/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ApplicationConfig } from '@openhmis-api/config';

import { SecurityAppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || ApplicationConfig.SECURITY_SERVICE.PORT ;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(SecurityAppModule,
     {options:{host:ApplicationConfig.DEFAULT.LISTEN_HOST,port  },transport:Transport.TCP } as TcpOptions );       
  // app.setGlobalPrefix(globalPrefix);
  await app.listen();
  Logger.log(
    `🚀 Security MicroService Application is running on: http://localhost:${port}/`
  );
}

bootstrap();
