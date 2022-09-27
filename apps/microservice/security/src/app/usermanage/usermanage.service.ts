import { Injectable } from '@nestjs/common';
import { KcadminclientService } from '../kcadminclient/kcadminclient.service';

@Injectable()
export class UsermanageService {
        constructor(private adminservice:KcadminclientService){

        }

        async getAllUsers(){
                console.log(`Finding All Users `);
                return this.adminservice.kcAdminClient.users.find()
        }

        async createUser(){
                 //this.adminservice.kcAdminClient.users.create({ })
        }
}
