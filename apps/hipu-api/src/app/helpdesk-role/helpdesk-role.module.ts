import { Module } from '@nestjs/common';
import { HelpdeskRoleService } from './helpdesk-role.service';
import { HelpdeskRoleController } from './helpdesk-role.controller';
import { ClientsModule } from '@nestjs/microservices';
import { clients } from '../clients';

@Module({
  imports:[ClientsModule.register(clients)],
  controllers: [HelpdeskRoleController],
  providers: [HelpdeskRoleService],
})
export class HelpdeskRoleModule {}
