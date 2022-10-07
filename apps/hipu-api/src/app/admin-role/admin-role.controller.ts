import { Controller, Get, Req } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { User } from '../decorators/user.decorator';
import { AdminRoleService } from './admin-role.service';

@Controller('admin')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  async createHealthServiceWorker(){
      // 
  }
  getLoginUserid(req:any){
      return req.user?.preferred_username 
  }

  @Get('hsp')
  async getAdminHSP(@User('preferred_username') adminuserid:string ){    
    return this.adminRoleService.getAdminHSP(adminuserid)
  }
  
  @Get('orgs')
  async getAllHSPOrgs(@User('preferred_username') userid){
       const hsp =  await  lastValueFrom(this.adminRoleService.getAdminHSP(userid));
       return this.adminRoleService.findAllOrg({serviceid:hsp.serviceid})
  }

}


