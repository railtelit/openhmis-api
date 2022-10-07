import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpdeskRoleModule } from './helpdesk-role/helpdesk-role.module';
import { AdminRoleModule } from './admin-role/admin-role.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule } from '@nestjs/microservices'
import { clients } from './clients';
import {} from 'keycloak-connect'
import { AuthGuard, KeycloakConnectModule, KeycloakConnectOptions, ResourceGuard, RoleGuard } from 'nest-keycloak-connect';
import { EnvironmentNames } from '@openhmis-api/config';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    ClientsModule.register(clients),
    AdminRoleModule, HelpdeskRoleModule,
    ConfigModule.forRoot({isGlobal:true}),
    KeycloakConnectModule.registerAsync({
      useFactory: (configservice: ConfigService) => {
        const options = {
          realm: 'openhmis-app',
          useNestLogger: true,
          secret: configservice.get(
            EnvironmentNames.keycloak.APPAPI.CLIENTSECRET
          ),
          clientId: configservice.get(
            EnvironmentNames.keycloak.APPAPI.CLIENTID
          ),
          authServerUrl: configservice.get(
            EnvironmentNames.keycloak.APPAPI.KEYCLOAK_URL
          ),
        } as KeycloakConnectOptions;
        console.log(options);
        return options;
      },      
      imports: [ConfigModule],
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    {provide:APP_GUARD,useClass:AuthGuard},
    {provide:APP_GUARD,useClass:RoleGuard},
    {provide:APP_GUARD,useClass:ResourceGuard},
  ],
})
export class AppModule {
    //   HSA ADMIN 
}


