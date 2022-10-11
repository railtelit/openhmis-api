import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { User } from './decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('roles')
  async getWorkerRoles(@User('preferred_username') userid:string){
      return this.appService.getHspWorkerRoles({userid})
  }
  
}
