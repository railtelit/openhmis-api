import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddHSPWorkderDTO, CreateHSPLocationDTO, RemoveHSPLocationDTO } from '@openhmis-api/interfaces';
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
  @Get('locations')
  async getAllHSPLocations(@User('preferred_username') userid){
       const hsp =  await  lastValueFrom(this.adminRoleService.getAdminHSP(userid));
       return this.adminRoleService.getAllHSPLocations({serviceid:hsp.serviceid})
  }

  @Post('locations')
  @UsePipes(new ValidationPipe({transform:true}))
  async createHSPLocation(@Body()  create:CreateHSPLocationDTO ,
           @User('preferred_username')  adminuserid:string ){

         const org = await lastValueFrom(this.adminRoleService.findOneOrg(create.org.id)); 
         if(!org?.id){
            throw new BadRequestException(`Invalid Organisation ${create.org.id}`);
         }
         if( String(org?.hsp?.adminuserid).toUpperCase() !==  adminuserid.toUpperCase() ){
            throw new ForbiddenException(`User Not Belongs to Service Id : ${org?.hsp?.adminuserid}`)
         }
         return this.adminRoleService.createHSPLocation(create)
  }

  @Delete('locations/:id')
  async removeHSPLocation( @Param('id') id:number ){
        return this.adminRoleService.removeHSPLocation(Number(id)  ) 
  }

  @Post('worker')
  async postWorker(@User('preferred_username') userid:string , @Body()  pl:AddHSPWorkderDTO  ){
        return this.adminRoleService.addWorker(pl)
  }

  @Get('worker')
  async getHSPWorkers(@User('preferred_username') userid:string ){
    const hsp =  await  lastValueFrom(this.adminRoleService.getAdminHSP(userid));
    if(!hsp?.serviceid){
        throw new BadRequestException(`Service Id Not Found. Invalid Userid `)
    }
    //  this.adminRoleService.findAllOrg({serviceid:hsp.serviceid})
    return this.adminRoleService.getHSPWorkers({serviceid:hsp?.serviceid})
  }
}


