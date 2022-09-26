import { Module, OnModuleInit } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KcadminclientService } from './kcadminclient/kcadminclient.service';
import { UsermanageService } from './usermanage/usermanage.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, KcadminclientService, UsermanageService],
})
export class SecurityAppModule implements OnModuleInit {
  onModuleInit() {
    //
  }
}
