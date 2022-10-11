import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';

@Injectable()
export class AbhaService {
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy){
                // 
        }

        async initPatientAuth(){
                // 
                // send Kafka Event
                // 
        }
}


