import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { AddHSPWorkderDTO, AppMessagePatterns, AssignHSPWorkerRoleDTO, CreateHSPLocationDTO, CreateKCUserIfNotExistsDTO, DataInterface, FindAdminUserHSPDTO, GetAllHSPOrgDTO, GetHSPLocationsDTO, GetHSPWorkersDTO, RemoveHSPLocationDTO, UnAssignHSPWorkerRoleDTO } from '@openhmis-api/interfaces';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AdminRoleService {

     constructor(@Inject(ClientConfig.HIPSTORE.NAME) private hipClient:ClientProxy,
                    @Inject(ClientConfig.SECURITY.NAME) private securityClient:ClientProxy   ){
            // 
     }
        
       getHipResponse<T>(pattern:any,{data,headers={}}:DataInterface<T>){
            return this.hipClient.send(pattern,{data,headers})
     }
       getSecurityResponse<T>(pattern:any,{data,headers={}}:DataInterface<T>){
            return this.securityClient.send(pattern,{data,headers})
     }
       getAdminHSP(adminuserid:string){
              console.log(`Finding Adminuser for ${adminuserid}`)
            return this.getHipResponse<FindAdminUserHSPDTO>(AppMessagePatterns.hipstore.hsp.findAdminuserHSP,
                            {data:{adminuserid},headers:{}})
     }
     async findAllOrg(request:GetAllHSPOrgDTO,headers={}){
             //
            return this.getHipResponse<GetAllHSPOrgDTO>(
                AppMessagePatterns.hipstore.hsporg.getAllHSPOrg,
                {data:request,headers}
            )
     }

     async getAllHSPLocations(data:GetHSPLocationsDTO){
              return this.getHipResponse<GetHSPLocationsDTO>(
                            AppMessagePatterns.hipstore.hsporg.getHSPLocations,
                            {data,headers:{}}
              )
     }
     async createHSPLocation(data:CreateHSPLocationDTO){
               return this.getHipResponse<CreateHSPLocationDTO>(
                            AppMessagePatterns.hipstore.hsporg.createHSPLocation,
                            {data,headers:{}}
               )
     }

       findOneOrg(id:number){
              return this.getHipResponse(
                     AppMessagePatterns.hipstore.hsporg.findOneHSPOrg,
                     {data:{id},headers:{}}
              )
     }
     removeHSPLocation(id:number){
              return this.getHipResponse<RemoveHSPLocationDTO>(
                     AppMessagePatterns.hipstore.hsporg.removeHSPLocation,
                     {data:{id,remarks:''},headers:{}}
              )
     }

     getHSPWorkers(data:GetHSPWorkersDTO){
              return this.getHipResponse<GetHSPWorkersDTO>(
                             AppMessagePatterns.hipstore.users.getHSPWorkers,
                             {data,headers:{}}
              )
     }
     async addWorker(data:AddHSPWorkderDTO){
              const createKCUserPR:CreateKCUserIfNotExistsDTO={
                     password:'1234',roles:[data.primaryrole],username:data.userid,
                     email:data.userid.includes('@')?data.userid: `${data.userid}@rtel`
              }
              console.log(`Creating Kc User `,createKCUserPR);
              
              const kcUserCreate = await  lastValueFrom( this.getSecurityResponse<CreateKCUserIfNotExistsDTO>(
                            AppMessagePatterns.security.users.createKCUserIfNotExists,
                            {data:createKCUserPR,headers:{}}
              )
              ); 
              if(!kcUserCreate?.id){
                     throw new HttpException(`Unable to Create KC User `,500);
              }
              console.log(`KCUSER CREATED `,kcUserCreate)
              return this.getHipResponse<AddHSPWorkderDTO>(
                     AppMessagePatterns.hipstore.users.addHSPWorker,
                     {data,headers:{}}
              )
     }

     unAssignHSPWorkerRole(data:UnAssignHSPWorkerRoleDTO){
              return this.getHipResponse<UnAssignHSPWorkerRoleDTO>(
                             AppMessagePatterns.hipstore.users.unassignHSPWorkerRole,
                             {data,headers:{}}
              )
     }
       assignHSPWorkerRole(data:AssignHSPWorkerRoleDTO){
              return this.getHipResponse<AssignHSPWorkerRoleDTO>(
                             AppMessagePatterns.hipstore.users.assignHSPWorkerRole,
                             {data,headers:{}}
              )
     }
}
