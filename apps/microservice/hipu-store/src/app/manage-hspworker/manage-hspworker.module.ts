import { Module } from '@nestjs/common';
import { ManageHspworkerService } from './manage-hspworker.service';
import { ManageHspworkerController } from './manage-hspworker.controller';
import * as  entites  from '../resource/entities'
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports:[TypeOrmModule.forFeature([...Object.values(entites)])],
  controllers: [ManageHspworkerController],
  providers: [ManageHspworkerService],
})
export class ManageHspworkerModule {}
