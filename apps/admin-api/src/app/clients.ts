import { ClientsModuleOptions, Transport } from "@nestjs/microservices";
import { ClientConfig } from "@openhmis-api/config";
import {
    ApplicationConfig,    
    EnvironmentNames,
  } from '@openhmis-api/config';
const NDHM_CLIENT_OPTIONS = {
    host:
      process.env[EnvironmentNames.clientService.NDHM.HOST] ||
      ClientConfig.NDHM.HOST,
    port:
      Number(process.env[EnvironmentNames.clientService.NDHM.PORT]) ||
      ClientConfig.NDHM.PORT,
    retryAttempts: 10,
    reconnect: true,
  };
  const SECURITY_OPTIONS = {
    host:
      process.env[EnvironmentNames.clientService.SECURITY.NAME] ||
      ClientConfig.SECURITY.HOST,
    port:
      Number(process.env[EnvironmentNames.clientService.SECURITY.PORT]) ||
      ApplicationConfig.SECURITY_SERVICE.PORT,
  };
  const HIP_STORE_OPTIONS={
        host:process.env[EnvironmentNames.clientService.HIP_STORE.HOST]||ApplicationConfig.DEFAULT.HOST,
        port:Number(process.env[EnvironmentNames.clientService.HIP_STORE.PORT]) || ApplicationConfig.HIP_STORE.PORT
  }
export const clients:ClientsModuleOptions=[
    {
        name: ClientConfig.NDHM.NAME,
        transport: Transport.TCP,
        options: NDHM_CLIENT_OPTIONS,
      },
      {
        name: ClientConfig.SECURITY.NAME,
        transport: Transport.TCP,
        options: SECURITY_OPTIONS,
      },
      {
        name:ClientConfig.HIPSTORE.NAME,transport:Transport.TCP,
        options:HIP_STORE_OPTIONS
      }
]