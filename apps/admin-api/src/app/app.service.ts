import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig, MessagePatterns } from '@openhmis-api/config';

@Injectable()
export class AppService {
  constructor(@Inject(ClientConfig.SECURITY.NAME) private securityClient:ClientProxy){

  }
  getData(): { message: string } {
    return { message: 'Welcome to admin-api!' };
  }

  async getUsers(){
       return this.securityClient.send(MessagePatterns.security.users.findAll,{})
  }
}
