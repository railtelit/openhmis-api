import { Module } from '@nestjs/common';
import { ManageHspOrgService } from './manage-hsporg.service';
import { ManageHspOrgController } from './manage-hsporg.controller';
import * as  entites  from '../resource/entities'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([...Object.values(entites)])],
  controllers: [ManageHspOrgController],
  providers: [ManageHspOrgService],
})
export class ManageHspOrgModule {}
