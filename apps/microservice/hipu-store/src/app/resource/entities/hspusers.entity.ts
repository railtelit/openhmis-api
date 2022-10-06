import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { HSPOrganisation } from "./hsp-organization.entity";

@Entity({name:'hsp_users'})
export class HSPUser{
        @PrimaryColumn()
        userid:string; 

        @Column()
        username:string;


        @ManyToOne(()=>HSPOrganisation,(org)=>org.users)
        org:HSPOrganisation
}