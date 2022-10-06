import { Controller } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';

@Controller('admin')
export class AdminRoleController {
  constructor(private readonly adminRoleService: AdminRoleService) {}

  async createHealthServiceWorker(){
      // 
  }

  
}


