import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig,   } from '@openhmis-api/config';
import { AppMessagePatterns } from '@openhmis-api/interfaces';

@Injectable()
export class AppService {
  constructor(@Inject(ClientConfig.SECURITY.NAME) private securityClient:ClientProxy){

  }
  getData(): { message: string } {
    return { message: 'Welcome to admin-api!' };
  }

  async getUsers(){
       return this.securityClient.send(AppMessagePatterns.security.users.findAll,{})
  }
}
