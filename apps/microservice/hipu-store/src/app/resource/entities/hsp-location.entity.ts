import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { HSPOrganisation } from "./hsp-organization.entity";
import { HSPUserRole } from "./hsp-userroles.entity";


@Entity({name:'hsp_locations'})
export class HSPLocation{
        @PrimaryGeneratedColumn()
        id:number;

        @Column()
        locationname:string

        @ManyToOne(()=>HSPOrganisation, (o)=>o.locations )
        org:HSPOrganisation

        @Column({nullable:true})
        roletype:string
        
        @Column({nullable:true})
        physicaltype:string

        @Column({default:'active'})
        status:string   
        
        @OneToMany(()=>HSPUserRole,(r)=>r.location)
        userroles:HSPUserRole[]
}