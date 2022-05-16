import { Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name:'dhpinfo'})
export class DHPInfo{
        @PrimaryGeneratedColumn()
        id:number
}