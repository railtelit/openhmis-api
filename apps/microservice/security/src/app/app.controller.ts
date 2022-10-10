import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {  } from '@openhmis-api/config';
import { AppMessagePatterns, CreateKCUserIfNotExistsDTO, DataInterface, FindOneKCUserDTO, RemoveKCUserRoleDTO, SecurityRemoveUserDTO } from '@openhmis-api/interfaces';

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
  

  @MessagePattern(AppMessagePatterns.security.users.removeUser)
  async removeAdminUser(@Payload() payload:DataInterface<SecurityRemoveUserDTO>){
      console.log(`Removing User `,payload)
      return this.userManageService.removeUser(payload.data)
  }
  
  @MessagePattern(AppMessagePatterns.security.users.findOneKCUser)
  async finOneKCUser(query:DataInterface<FindOneKCUserDTO>){
       return  this.userManageService.findOneKeycloakUser(query.data)
  }

  @MessagePattern(AppMessagePatterns.security.users.createKCUserIfNotExists)
  async createKcUserIfNotExists(create:DataInterface<CreateKCUserIfNotExistsDTO>){
       return  this.userManageService.createUserIfNotExists(create.data)
  }
  @MessagePattern(AppMessagePatterns.security.users.removeKCUserRole)
  async removeKcUserClientRole(pr: DataInterface<RemoveKCUserRoleDTO>){
       return  this.userManageService.removeUserRole(pr.data)
  }

  

}
