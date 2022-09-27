import { Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { PostDataInterface } from '@openhmis-api/interfaces';
import { retry, tap, timeout } from 'rxjs';

@Injectable()
export class AdminService implements OnApplicationBootstrap{
        static scount=0
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy){
                AdminService.scount++;
        }

        async onApplicationBootstrap() {                        
                        await this.ndhmClient.connect().catch(err=>{
                                //
                                console.error(`Error Connect :: `,err)
                        }).then(v=>{
                                console.log(`ADMIN->NDHMCLIENT:READY` );
                        }) 
        }
        
        async getServices(){
                await this.ndhmClient.connect();  
                console.log(`Service Counts `,AdminService.scount)      
                const payload:PostDataInterface = {context:'v1/bridges/getServices',domain:'GATEWAY',data:{},headers:{}}
                return this.ndhmClient.send({METHOD:'GET'},payload).pipe(  
                        timeout(3000),                        
                        retry(2),
                         tap(_=>{
                                 //console.log(this.ndhmClient)
                                 // Use Redis Cache for future Queries to Serve in Case of Error 
                         }) )
        }

       
}

