/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';
import { ApplicationConfig } from '@openhmis-api/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const port = process.env.PORT || ApplicationConfig.HIPU_STORE.PORT;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{
      transport:Transport.TCP,  
      options:{   host:ApplicationConfig.DEFAULT.LISTEN_HOST,port,keepalive:0},
  } as TcpOptions );
  const globalPrefix = 'api';
  //app.setGlobalPrefix(globalPrefix);
  await app.listen();
  Logger.log(
    `🚀 HIPU Microservice Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

