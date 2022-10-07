import { Module } from '@nestjs/common';
import { ManageHspOrgService } from './manage-hsporg.service';
import { ManageHspOrgController } from './manage-hsporg.controller';

@Module({
  controllers: [ManageHspOrgController],
  providers: [ManageHspOrgService],
})
export class ManageHspOrgModule {}
