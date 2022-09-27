import { Injectable } from '@nestjs/common';
import { DataInterface } from '@openhmis-api/interfaces';
import { KcadminclientService } from '../kcadminclient/kcadminclient.service';

@Injectable()
export class UsermanageService {
        constructor(private adminservice:KcadminclientService){

        }

        async getAllUsers(){
                console.log(`Finding All Users `);
                return this.adminservice.kcAdminClient.users.find()
        }

        async createUser(payload:DataInterface){
                 const {data:{username,email,realm='openhmis-app',password }}=payload
                 //this.adminservice.kcAdminClient.users
                 return  this.adminservice.kcAdminClient.users.create({realm,username,email,credentials:[{type:'password',temporary:false,value:password}] })                                  
        }
}
