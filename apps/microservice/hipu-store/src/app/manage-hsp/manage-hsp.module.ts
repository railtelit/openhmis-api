import { Module } from '@nestjs/common';
import { ManageHspService } from './manage-hsp.service';
import { ManageHspController } from './manage-hsp.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { HealthServiceProvider } from '../resource/entities/health-service-provider.entity';
import * as  entites  from '../resource/entities'

@Module({
  imports:[
       TypeOrmModule.forFeature( [...Object.values(entites)] )
  ],
  controllers: [ManageHspController],
  providers: [ManageHspService],
  exports:[TypeOrmModule]
})
export class ManageHspModule {}
