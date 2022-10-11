import { ClientsModuleOptions, TcpClientOptions, TcpOptions, Transport } from "@nestjs/microservices";
import { ApplicationConfig, ClientConfig, EnvironmentNames } from "@openhmis-api/config";

const HIP_STORE_OPTIONS = {
    host:process.env[EnvironmentNames.clientService.HIPU_STORE.HOST]||ApplicationConfig.DEFAULT.HOST,
    port:Number(process.env[EnvironmentNames.clientService.HIPU_STORE.PORT])||ApplicationConfig.HIPU_STORE.PORT,
} 
const SECURITY_STORE_OPTIONS = {
    host:process.env[EnvironmentNames.clientService.SECURITY.HOST]||ApplicationConfig.DEFAULT.HOST,
    port:Number(process.env[EnvironmentNames.clientService.SECURITY.PORT])||ApplicationConfig.SECURITY_SERVICE.PORT,
} 
const NDHM_STORE_OPTIONS = {
    host:process.env[EnvironmentNames.clientService.SECURITY.HOST]||ApplicationConfig.DEFAULT.HOST,
    port:Number(process.env[EnvironmentNames.clientService.SECURITY.PORT])||ApplicationConfig.SECURITY_SERVICE.PORT,
} 

export  const clients:ClientsModuleOptions = [
        {
            name:ClientConfig.HIPSTORE.NAME,
            transport:Transport.TCP,
            options:HIP_STORE_OPTIONS
        } ,
        {
            name:ClientConfig.SECURITY.NAME,
            transport:Transport.TCP,
            options:SECURITY_STORE_OPTIONS
        }, 
        {
            name:ClientConfig.NDHM.NAME,
            transport:Transport.TCP,
            options:NDHM_STORE_OPTIONS
        } 
]