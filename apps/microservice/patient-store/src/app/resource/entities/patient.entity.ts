import { Column, Double, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { PatientHealthId } from "./patientabha.entity";


@Entity({name:'patients'})
export class PatientResource{

        @PrimaryGeneratedColumn('uuid')
        id:string; 

        @Column()
        fullname:string 

        @Column({nullable:true})
        gender:string;

        @Column({nullable:true,type:'date'})
        birthDate:Date

        @Column({type:'timestamp',nullable:true})
        registerdate:Timestamp

        @Column({type:"numeric",nullable:true})
        age:Double

        @Column({type:'timestamp',nullable:true})
        agerecorddate:Timestamp

        @Column({nullable:true})
        contact_mobileno:string; 

        @Column({nullable:true})
        contact_email:string; 

        @Column({nullable:true})
        districtCode:string; 

        @Column({nullable:true})
        stateCode:string; 
 

        @OneToMany(()=>PatientHealthId,(ph)=>ph.patient,{nullable:true})
        healthids:PatientHealthId[]

}