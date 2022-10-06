import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import {
  ApplicationConfig,
  ClientConfig,
  EnvironmentNames,
} from '@openhmis-api/config';
import {
  AuthGuard,
  KeycloakConnectModule,
  KeycloakConnectOptions,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ManageHipService } from './manage-hip/manage-hip.service';
import { ManageHiuService } from './manage-hiu/manage-hiu.service';
import { ManageHipController } from './manage-hip/manage-hip.controller';
import { ManageHiuController } from './manage-hiu/manage-hiu.controller';
import { clients } from './clients';
//console.log(process.env)

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), ClientsModule.register(clients),
    KeycloakConnectModule.registerAsync({
      useFactory: (configservice: ConfigService) => {
        const options = {
          realm: 'openhmis-admin',
          useNestLogger: true,
          secret: configservice.get(
            EnvironmentNames.keycloak.ADMINAPI.CLIENTSECRET
          ),
          clientId: configservice.get(
            EnvironmentNames.keycloak.ADMINAPI.CLIENTID
          ),
          authServerUrl: configservice.get(
            EnvironmentNames.keycloak.ADMINAPI.KEYCLOAK_URL
          ),
        } as KeycloakConnectOptions;
        console.log(options);
        return options;
      },
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
   
  ],
  controllers: [
    AppController,
    AdminController,
    ManageHipController,
    ManageHiuController,
  ],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    AdminService,
    ManageHipService,
    ManageHiuService,
  ],
})
export class AppModule {}
