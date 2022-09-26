import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { AdminService } from './admin.service';

@UseGuards(AuthGuard,RoleGuard)
@Controller('admin')
export class AdminController {
    constructor(private adminService:AdminService){

    }

    @Get('services')
    async getClientServices(){
            return this.adminService.getServices();
    }

}
