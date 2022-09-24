import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppMessagePatterns, DataInterface, PatientInterface } from '@openhmis-api/interfaces';

import { AppService } from './app.service';
import { PatientService } from './patient.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private patientService:PatientService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
  
  @MessagePattern(AppMessagePatterns.patients.findAllPatients)
  async  getAllPatients(){
      return  this.patientService.findAllPatients();
  }

  @MessagePattern(AppMessagePatterns.patients.createOne)
  async createOnePatient(payload:DataInterface<PatientInterface>){
            console.log(`Create Patient Action`,JSON.stringify(payload)) 
          return this.patientService.addNewPatient(payload.data)
  }
  @MessagePattern(AppMessagePatterns.patients.filterPatient)
  async filterPatients(payload:DataInterface<PatientInterface>){
            console.log(`Filtering Patient `)
          return this.patientService.filterPatient(payload.data)
  }

  
}
