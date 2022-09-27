import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApplicationConfig, ClientConfig, } from '@openhmis-api/config';
import { AppMessagePatterns } from '@openhmis-api/interfaces';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';
import { pipe, retry, timeout } from 'rxjs';
import { AdminService } from './admin.service';

@UseGuards(AuthGuard,RoleGuard)
@Roles({roles:['admin']})
@Controller('admin')
export class AdminController {
    
    _errorHandler=pipe( timeout(ApplicationConfig.DEFAULT.TIMEOUT),  retry(1) )
    constructor(private adminService:AdminService,
             @Inject(ClientConfig.SECURITY.NAME) private  securityService:ClientProxy){

    }

    @Get('services')    
    async getClientServices(){
            return this.adminService.getServices();
    }

    @Get('users')
    async getRealmUsers(){
            return this.securityService.send(AppMessagePatterns.security.users.findAll,{}).
                        pipe(  timeout(ApplicationConfig.DEFAULT.TIMEOUT),  retry(1) )
            // Publish Event In Case of Errors  ERROR_LOG_SERVICE
    }
    @Get('createuser')
    async createUser(){ 
            // 
             
    }
}
