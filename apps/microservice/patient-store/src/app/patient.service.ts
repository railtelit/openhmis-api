import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PatientInterface } from '@openhmis-api/interfaces';
import { Patient, PatientModel } from '../schema/patient.schema';

@Injectable()
export class PatientService {
         constructor(@InjectModel(Patient.name) private Patient:PatientModel ){

         }

         async findAllPatients(){
                return this.Patient.find().exec();
         }

         async addNewPatient(newPatient:PatientInterface){
                 const first = await  this.Patient.findOne({healthId:newPatient.healthId}).exec(); 
                 if(first){
                    return first; 
                 }
                 console.log(`Creat//`,newPatient)
                 const createOne=new this.Patient(newPatient)
                 return  createOne.save();
            // 
         }

         async filterPatient(filter:any={healthIdNumber:'0'}){
             console.log(`Filtering Patient `,filter)
             return this.Patient.find(filter)
         }
}
