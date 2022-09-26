import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApplicationConfig, ClientConfig, EnvironmentNames } from '@openhmis-api/config';
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
//console.log(process.env)
const NDHM_CLIENT_OPTIONS={host: process.env[EnvironmentNames.clientService.NDHM.HOST]|| ClientConfig.NDHM.HOST ,
      port: Number(process.env[EnvironmentNames.clientService.NDHM.PORT])||ClientConfig.NDHM.PORT } ;
const SECURITY_OPTIONS={host:process.env[EnvironmentNames.clientService.SECURITY.NAME]||ClientConfig.SECURITY.HOST,
      port:Number(process.env[EnvironmentNames.clientService.SECURITY.PORT]) || ApplicationConfig.SECURITY_SERVICE.PORT }
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    ClientsModule.register([
      {name: ClientConfig.NDHM.NAME,transport:Transport.TCP,
       options: NDHM_CLIENT_OPTIONS },
       {name:ClientConfig.SECURITY.NAME, transport:Transport.TCP,options: SECURITY_OPTIONS }
    ])
  ],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    AdminService,
  ],
})
export class AppModule {}
