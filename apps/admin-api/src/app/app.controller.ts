import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleGuard, RoleMatchingMode, Roles } from 'nest-keycloak-connect';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard,RoleGuard)  
  @Roles({roles:['admin'],mode:RoleMatchingMode.ANY})
  @Get('keycloak')
  async testkeycloak(){
      return {msg:'Its Working'}
  }
}
