import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { PostDataInterface } from '@openhmis-api/interfaces';

@Injectable()
export class AdminService {
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy){

        }

        async getServices(){
                const payload:PostDataInterface = {context:'v1/bridges/getServices',domain:'GATEWAY',data:{},headers:{}}
                return this.ndhmClient.send({METHOD:'GET'},payload)
        }
}
