
import { DataSource } from "typeorm";

const DEFAULT_HOST='192.168.1.26'

export const HipuDataSource= new DataSource({
    type:'postgres',
    database:'openhmis',
    username:'openhmis',password:'openhmis',host:process.env.PG_HOST||DEFAULT_HOST,port: Number(process.env.PG_PORT)|| 5432,
    entities:[ "**/resource/**/*.entity.ts" ],
    migrations:[ "migrations/*.ts"],
 
} as any );

