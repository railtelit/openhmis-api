import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { AddHSPWorkderDTO, AppMessagePatterns, CreateHSPLocationDTO, DataInterface, FindAdminUserHSPDTO, GetAllHSPOrgDTO, GetHSPLocationsDTO, GetHSPWorkersDTO, RemoveHSPLocationDTO } from '@openhmis-api/interfaces';

@Injectable()
export class AdminRoleService {

     constructor(@Inject(ClientConfig.HIPSTORE.NAME) private hipClient:ClientProxy){
            // 
     }
        
       getHipResponse<T>(pattern:any,{data,headers={}}:DataInterface<T>){
            return this.hipClient.send(pattern,{data,headers})
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
     addWorker(data:AddHSPWorkderDTO){
              return this.getHipResponse<AddHSPWorkderDTO>(
                     AppMessagePatterns.hipstore.users.addHSPWorker,
                     {data,headers:{}}
              )
     }
}
