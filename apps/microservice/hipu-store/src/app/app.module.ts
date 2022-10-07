import { Module, OnApplicationBootstrap } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApplicationConfig,
  DatabaseConfig,
  EnvironmentNames,
} from '@openhmis-api/config';
import { ManageHspModule } from './manage-hsp/manage-hsp.module';
import { ManageHspworkerModule } from './manage-hspworker/manage-hspworker.module';
import { ManageHspOrgModule } from './manage-hsporg/manage-hsporg.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:
        process.env[EnvironmentNames.database.PG.HOST] ||
        ApplicationConfig.DEFAULT.HOST,
      port: Number(process.env[EnvironmentNames.database.PG.PORT]) || 5432,
      username:
        process.env[EnvironmentNames.database.PG.USER] ||
        DatabaseConfig.PG.DEFAULT_USERNAME,
      password:
        process.env[EnvironmentNames.database.PG.PASSWORD] ||
        DatabaseConfig.PG.DEFAULT_PASSWORD,
      database:
        process.env[EnvironmentNames.database.PG.DATABASE] ||
        DatabaseConfig.PG.DEFAULT_DATABASE,
      synchronize: false,
      autoLoadEntities: true,
    }),
    ManageHspModule,
    ManageHspworkerModule,
    ManageHspOrgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    //
    try {
      //
    } catch (error) {
      //
    }
  }
}
