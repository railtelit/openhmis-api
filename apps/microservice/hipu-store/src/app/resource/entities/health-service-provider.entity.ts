import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'health_service_provider'})
export class HealthServiceProvider{
        @PrimaryColumn()
        serviceid:number; 

        @Column({nullable:true})
        servicename:string
}