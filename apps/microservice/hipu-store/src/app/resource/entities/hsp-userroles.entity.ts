import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { HSPLocation } from "./hsp-location.entity"
import { HSPUser } from "./hspusers.entity"

@Entity({name:'hsp_userroles'})
export class HSPUserRole{

        @PrimaryGeneratedColumn()
        roleid:number
        
        @Column()
        role:string; 
        
        @ManyToMany(()=>HSPUser,(user)=>user.userroles)
        @JoinTable()
        user:HSPUser 

        @ManyToMany(()=>HSPLocation,(loc)=>loc.userroles)
        @JoinTable()
        location:HSPLocation
}