import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatterns } from '@openhmis-api/config';
import { DataInterface } from '@openhmis-api/interfaces';

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

  @MessagePattern(MessagePatterns.security.users.findAll)
  async getAllUsers(@Payload() payload:DataInterface){
       return this.userManageService.getAllUsers();
  }
  
}
