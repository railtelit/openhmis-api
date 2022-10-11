import { Controller, Get } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { HelpdeskRoleService } from './helpdesk-role.service';

@Controller('helpdesk')
export class HelpdeskRoleController {
  constructor(private readonly helpdeskRoleService: HelpdeskRoleService) {}

  @Get('roles')
  async getHSPWorkerRoles(@User('preferred_username') userid:string){ 
      return this.helpdeskRoleService.getHspWorkerRoles({userid})
  }

}
