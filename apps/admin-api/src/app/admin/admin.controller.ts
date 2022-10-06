import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { ApplicationConfig, ClientConfig, InvalidRequestError, } from '@openhmis-api/config';
import { AppMessagePatterns, SaveHSPDTO, UnAssignAdminUserDTO } from '@openhmis-api/interfaces';
import { AuthGuard, RoleGuard, Roles } from 'nest-keycloak-connect';
import { pipe, retry, timeout } from 'rxjs';
import { AdminService, CreateServiceAdminDTO } from './admin.service';

@UseGuards(AuthGuard,RoleGuard)
@Roles({roles:['admin']})
@Controller('')
export class AdminController {
    
    _errorHandler=pipe( timeout(ApplicationConfig.DEFAULT.TIMEOUT),  retry(1) )
    constructor(private adminService:AdminService,
             @Inject(ClientConfig.SECURITY.NAME) private  securityService:ClientProxy){

    }
    @Get('verifyHeartbeat')
    async verifyHeartbeat(){
               return this.adminService.verifyHeartbeat(); 
    }
    @Get('services')    
    async getClientServices(){
            return this.adminService.getServices();
    }

    @Get('getStates')
    async getStates(){
                return this.adminService.getStates();
    }
    @Get('getDistricts')
    async getDistricts(@Query('stateCode')  stateCode:string ){
                return this.adminService.getDistricts({stateCode});
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

    @Post('unAssignAdminUser')
    async UnAssignServiceAdmin(@Body() request:UnAssignAdminUserDTO){
                return this.adminService.unAssignAdminUser(request)
    }

    @Post('initializeService')
    async initializeHealthService(@Body() service:SaveHSPDTO){
                ///Todo :   Get Details -> Sync in OpenHMIS -> Return Same :
                if(!service){
                                 throw new InvalidRequestError(`No Service Request Error `);
                }
                return this.adminService.initializeService(service)
    }   

    @Get('getServiceAdmin')
    async getServiceAdminUser(@Query('serviceid')  serviceid:string){
                // 
                return this.adminService.getServiceAdmin(serviceid)
    }


    @Post('createServiceAdmin')
    async createServiceAdmin(@Body() create:CreateServiceAdminDTO ){
        // Todo Save in 
        // Fetch User First / 
        // userName : ``
        return  this.adminService.createServiceAdmin(create)
    }
}



