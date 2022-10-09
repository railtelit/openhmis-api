import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { HSPLocation } from "./hsp-location.entity";
import { HSPOrganisation } from "./hsp-organization.entity";
import { HSPUserRole } from "./hsp-userroles.entity";

@Entity({name:'hsp_users'})
export class HSPUser{
        @PrimaryColumn()
        userid:string; 

        @Column()
        username:string;

        @Column({nullable:true})
        keycloakid:string

        @Column({nullable:true})
        emailid:string
        
        @Column({nullable:true})
        mobileno:string

        @ManyToOne(()=>HSPOrganisation,(org)=>org.users)
        org:HSPOrganisation 


        @OneToMany(()=>HSPUserRole,(r)=>r.user)
        userroles:HSPUserRole[]
}

