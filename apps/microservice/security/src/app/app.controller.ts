import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {  } from '@openhmis-api/config';
import { AppMessagePatterns, DataInterface } from '@openhmis-api/interfaces';

import { AppService } from './app.service';
import { UsermanageService } from './usermanage/usermanage.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
          private userManageService:UsermanageService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern(AppMessagePatterns.security.users.findAll)
  async getAllUsers(@Payload() payload:DataInterface){
       return this.userManageService.getAllUsers();
  }

  @MessagePattern(AppMessagePatterns.security.users.createAdminUser)
  async createAdminUser(@Payload() payload){
      console.log(`Create User `,payload)
      return this.userManageService.createAdminUser(payload)
  }
  
}
