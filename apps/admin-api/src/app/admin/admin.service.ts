import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { PostDataInterface } from '@openhmis-api/interfaces';
import { retry, timeout } from 'rxjs';

@Injectable()
export class AdminService implements OnApplicationBootstrap{
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy){

        }

        async onApplicationBootstrap() {

                        await this.ndhmClient.connect().catch(err=>{
                                //
                                console.error(`Error Connect`,err)
                        }).then(v=>{
                                console.log(`ADMIN->NDHMCLIENT:READY`);
                        })
        }
        
        async getServices(){
                await this.ndhmClient.connect();        
                const payload:PostDataInterface = {context:'v1/bridges/getServices',domain:'GATEWAY',data:{},headers:{}}
                return this.ndhmClient.send({METHOD:'GET'},payload).pipe(  retry(1), timeout(5000))
        }
}
