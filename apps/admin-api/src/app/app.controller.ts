import { Body, Controller, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindOneHSPDTO, SaveHSPDTO } from '@openhmis-api/interfaces';
import { IsNotEmpty } from 'class-validator';
import { AuthGuard, RoleGuard, RoleMatchingMode, Roles, Unprotected } from 'nest-keycloak-connect';

import { AppService,   } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
        ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @UseGuards(AuthGuard,RoleGuard)  
  @Roles({roles:['admin'],mode:RoleMatchingMode.ANY})
  @Get('keycloak')
  async testkeycloak(){
      return {msg:'Its Working ..'}
  }

  @Get('testadmin')
  async testAdmin(){
       return this.appService.getUsers()
  }

  @Unprotected()
  @Get('findhsp')
  @UsePipes(new ValidationPipe())
  async findHSP( @Query() query:FindOneHSPDTO ){
      return this.appService.getAllHSP();
  }
  
  @Unprotected()
  @Post('savehsp')
  @UsePipes(new ValidationPipe({transform:true}))
  async createHSP( @Body() save:SaveHSPDTO ){
      console.log(`Transfor hsp `,save)
      return this.appService.saveHSP(save);
  }
  @Unprotected()
  @Get('hspseq')
  @UsePipes(new ValidationPipe({transform:true}))
  async nextHSPseq(){
      
      return this.appService.nextHSPSeq();
  }
  
}
