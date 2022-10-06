import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelpdeskRoleModule } from './helpdesk-role/helpdesk-role.module';
import { AdminRoleModule } from './admin-role/admin-role.module';


@Module({
  imports: [AdminRoleModule, HelpdeskRoleModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
