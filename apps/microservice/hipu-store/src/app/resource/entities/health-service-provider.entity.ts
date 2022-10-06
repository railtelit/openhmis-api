import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { HSPGenCode, HSPOrganisation } from "./hsp-organization.entity";


@Entity({name:'hsp_master'})
export class HealthServiceProvider {
        @PrimaryColumn()
        serviceid:string; 

        @Column()
        servicename:string; 

        @Column({type:'text',default:[],array:true})
        service_types:string[]; 

        @Column({nullable:true})
        email:string;

        @Column()
        suffix:string;

        @Column({nullable:true})
        hprid:string

        @Column({nullable:true})
        logoid:string 

        @Column({type:'boolean',default:true})
        isactive:boolean

        @Column({nullable:true})
        stateCode:string
        
        @Column({nullable:true})
        districtCode:string 

        @OneToMany( ()=>HSPOrganisation,(org)=>org.hsp )
        orgs:HSPOrganisation[]
      
        @Column({nullable:true})
        adminuserid:string

        
}


@Entity({name:'hsp_gencodetypes'})
export class HSPGenCodeType{

        @PrimaryColumn()
        codetype:string
        
        @OneToMany(()=>HSPGenCode,(gencode)=>gencode.codetype)
        codes:HSPGenCode[]
}

