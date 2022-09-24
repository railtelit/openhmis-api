import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseConfig, DatabaseNames, EnvironmentNames } from '@openhmis-api/config';
import { SchemaModule } from '../schema/schema.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientService } from './patient.service';


const MONGO = {
  HOST:
    process.env[EnvironmentNames.database.MONGO.HOST] ||
    DatabaseConfig.MONGO.DEFAULT_HOST,
  USERNAME:
    process.env[EnvironmentNames.database.MONGO.USER] ||
    DatabaseConfig.MONGO.DEFAULT_USERNAME,
  PASSWORD:
    process.env[EnvironmentNames.database.MONGO.PASSWORD] ||
    DatabaseConfig.MONGO.DEFAULT_PASSWORD,
};
console.log(MONGO);


@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO.HOST}/${DatabaseNames.PATIENT}`, {
      auth: { username: MONGO.USERNAME, password: MONGO.PASSWORD },
      authSource: 'admin',
    }),
    SchemaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PatientService],
})
export class PatientStoreAppModule {}
