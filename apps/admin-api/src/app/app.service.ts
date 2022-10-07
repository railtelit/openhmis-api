import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig,   } from '@openhmis-api/config';
import { AppMessagePatterns, DataInterface, FindOneHSPDTO, SaveHSPDTO, UnAssignAdminUserDTO } from '@openhmis-api/interfaces';


@Injectable()
export class AppService {
  constructor(@Inject(ClientConfig.SECURITY.NAME) private securityClient:ClientProxy,
            @Inject(ClientConfig.HIPSTORE.NAME) private hipStoreClient:ClientProxy
       ){

  }
  getData(): { message: string } {
    return { message: 'Welcome to admin-api!' };
  }

  async getUsers(){
       return this.securityClient.send(AppMessagePatterns.security.users.findAll,{})
  }

  async getAllHSP(){
      return this.hipStoreClient.send(AppMessagePatterns.hipstore.hsp.getAllHSP,{})
  }
  async findOneHSP(query:FindOneHSPDTO){
      return this.hipStoreClient.send(AppMessagePatterns.hipstore.hsp.findOneHSP,query)
  }

  async saveHSP(save:SaveHSPDTO){
      const payload:DataInterface={headers:{},data:save}
      return this.hipStoreClient.send(AppMessagePatterns.hipstore.hsp.saveHSP,payload)
    }
    
  async nextHSPSeq(){

    return this.hipStoreClient.send(AppMessagePatterns.hipstore.hsp.getNextHSPSequence,{})

  }
 
}

