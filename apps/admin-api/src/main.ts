
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApplicationConfig } from '@openhmis-api/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const globalPrefix = ApplicationConfig.ADMIN_API.PREFIX||'admin';
  app.setGlobalPrefix(globalPrefix);
  //console.log(process.env)
  const port = process.env.PORT || ApplicationConfig.ADMIN_API.PORT;
  await app.listen(port,);
  Logger.log(
    `🚀 ADMIN _ API Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
