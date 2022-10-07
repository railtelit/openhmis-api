import { Module } from '@nestjs/common';
import { ManageHspworkerService } from './manage-hspworker.service';
import { ManageHspworkerController } from './manage-hspworker.controller';

@Module({
  controllers: [ManageHspworkerController],
  providers: [ManageHspworkerService],
})
export class ManageHspworkerModule {}
