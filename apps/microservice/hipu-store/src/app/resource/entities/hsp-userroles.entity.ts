import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { HSPLocation } from "./hsp-location.entity"
import { HSPUser } from "./hspusers.entity"

@Entity({name:'hsp_userroles'})
export class HSPUserRole{

        @PrimaryGeneratedColumn()
        roleid:number
        
        @Column()
        role:string; 
        
        @ManyToOne(()=>HSPUser,(user)=>user.userroles,)        
        user:HSPUser

        @ManyToOne(()=>HSPLocation,(loc)=>loc.userroles)        
        location:HSPLocation
}