import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApplicationConfig, ClientConfig, InvalidRequestError } from '@openhmis-api/config';
import { AppMessagePatterns, DataInterface } from '@openhmis-api/interfaces';
import { pipe, retry, timeout } from 'rxjs';

const RETRY_PIPE=pipe(timeout(ApplicationConfig.DEFAULT.TIMEOUT),retry(1)) 
// Requires HIP-STORE-SERVICE 
@Injectable()
export class ManageHipService {
    constructor(@Inject(ClientConfig.HIPSTORE.NAME) private hipStore:ClientProxy,
                       @Inject(ClientConfig.SECURITY.NAME) private security:ClientProxy  ){
            //
    }

    async  getHIPAdminUser(request:{hipCode:string}){
             const payload:DataInterface={headers:{},data:{hipCode:request.hipCode}}
             this.hipStore.send(AppMessagePatterns.hipstore.users.findOne,{}).pipe(RETRY_PIPE)
    }


    async createHIPAdminUser(request:CreateHIPAdminDto){
            // 
            const {hipCode,stateCode,districtCode}=request; 
            if(!hipCode || !stateCode || !districtCode){
                         throw  new InvalidRequestError(`Required Parameters : ${Object.values(CreateHIPAdminDto).join(',')} `);
            }
            const useridSequence =   `useridseq`// getNextVal()
            const payload:DataInterface = {data: {hipCode,stateCode,districtCode},headers:{}}
            const userInfo= { username:`HIP${stateCode}${districtCode}` }
            /// Save User 
            this.hipStore.send(AppMessagePatterns.hipstore.users.saveAdminUser,payload)
                        .pipe(RETRY_PIPE);
            // 
    }
}


export class CreateHIPAdminDto{
        hipCode:string;
        stateCode:string
        districtCode:string 
}