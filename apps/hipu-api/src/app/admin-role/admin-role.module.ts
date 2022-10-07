import { Module } from '@nestjs/common';
import { AdminRoleService } from './admin-role.service';
import { AdminRoleController } from './admin-role.controller';
import { ClientsModule } from '@nestjs/microservices';
import { clients } from '../clients';

@Module({
  imports:[
      ClientsModule.register(clients)
  ],
  controllers: [AdminRoleController],
  providers: [AdminRoleService],
})
export class AdminRoleModule {}
