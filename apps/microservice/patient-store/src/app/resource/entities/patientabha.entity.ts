import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PatientResource } from "./patient.entity";



@Entity({name:'patient_healthid'})
export class PatientHealthId{
    
        @PrimaryGeneratedColumn()
        id:number; 

        @ManyToOne(()=>PatientResource,(pr)=>pr.healthids,{nullable:false})
        patient:PatientResource

}