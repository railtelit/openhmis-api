import { Entity, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany, Column } from "typeorm";
import { HealthServiceProvider, HSPGenCodeType } from "./health-service-provider.entity";
import { HSPUser } from "./hspusers.entity";

@Entity()
export class HSPOrganisation{
        @PrimaryGeneratedColumn()
        id:number 
        
        @ManyToOne(()=>HealthServiceProvider,(hsp)=>hsp.orgs,{nullable:false})
        hsp:HealthServiceProvider 

        @Column()
        orgname:string; 

        @Column()
        orgtype:string;

        @OneToMany(()=>HSPUser,(user)=>user.org,{nullable:true})
        users:HSPUser[]
}

@Entity({name:'hsp_gencodes'})
export class HSPGenCode{

        @PrimaryGeneratedColumn()
        id:number; 

        @Column()
        code:string;

        @ManyToOne(()=>HSPGenCodeType,(ct)=>ct.codes)
        codetype:HSPGenCodeType
}