import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { AppMessagePatterns, DataInterface, GetHSPWorkerRolesDTO } from '@openhmis-api/interfaces';

@Injectable()
export class AppService {
  constructor(@Inject(ClientConfig.HIPSTORE.NAME) private hipClient:ClientProxy){

  }
  getHipResponse<T>(pattern:any,{data,headers={}}:DataInterface<T>){
    return this.hipClient.send(pattern,{data,headers})
  }

  getData(): { message: string } {
    return { message: 'Welcome to hipu-api!' };
  }

  async getHspWorkerRoles(query:GetHSPWorkerRolesDTO){
    return this.getHipResponse<GetHSPWorkerRolesDTO>(  
            AppMessagePatterns.hipstore.users.getHSPWorkerRoles,
            {data:query,headers:{}}
    )
}

}
