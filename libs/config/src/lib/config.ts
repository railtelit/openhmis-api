
export const EnvironmentNames={
  database:{
     MONGO:{
         HOST:'MONGODB_HOST',PORT:'MONGODB_PORT',USER:"MONGODB_USER",PASSWORD:"MONGODB_PASSWORD"
     },
     PG:{
         HOST:'OPENHMIS_PGHOST',PORT:'OPENHMIS_PGPORT',DATABASE:'OPENHMIS_PGDATABASE',
         USER:"OPENHMIS_PGUSER",PASSWORD:"OPENHMIS_PGPASSWORD"
     },
     DEFAULT:{
         HOST:'192.168.1.26'
     }
  },
  PORT:'PORT',
  keycloak:{
          ADMINAPI:{CLIENTID:'ADMINAPI_CLIENT_ID',CLIENTSECRET:'ADMINAPI_CLIENT_SECRET',
               KEYCLOAK_URL:'KEYCLOAK_URL' },
          APPAPI:{CLIENTID:'APPAPI_CLIENT_ID',CLIENTSECRET:'APPAPI_CLIENT_SECRET',
               KEYCLOAK_URL:'KEYCLOAK_URL' },
          SECURITY:{CLIENTID:'SECURITY_CLIENT_ID',CLIENTSECRET:'SECURITY_CLIENT_SECRET',
                    KEYCLOAK_URL:'KEYCLOAK_URL' }
  },
  clientService:{
          NDHM:{NAME:'NDHM_CLIENT_NAME',HOST:'NDHM_CLIENT_HOST',PORT:'NDHM_CLIENT_PORT'},
          SECURITY:{NAME:'MS_SECURITY',HOST:'MS_SECURITY_HOST',PORT:'MS_SECURITY_PORT' },
          HIPU_STORE:{NAME:'MS_HIPUSTORE',HOST:'MS_HIPUSTORE_HOST',PORT:'MS_HIPUSTORE_PORT' },
          HIU_STORE:{NAME:'MS_HIUSTORE',HOST:'MS_HIUSTORE_HOST',PORT:'MS_HIUSTORE_PORT' },
  }
}
export const DatabaseConfig={
  MONGO:{ DEFAULT_HOST:`192.168.1.26`,PORT:27017, 
     DEFAULT_USERNAME:`admin`,DEFAULT_PASSWORD:`admin` },
  PG:{DEFAULT_USERNAME:'openhmis',DEFAULT_PASSWORD:'openhmis',DEFAULT_DATABASE:'openhmis'}
}
export const DatabaseNames={
     NDHM:'ndhm',
     PATIENT:'patient' 
}
  
export const ClientConfig={
          NDHM:{NAME:'NDHM_CLIENT',HOST:'',PORT:3500 },
          SECURITY:{NAME:'MS_SECURITY',HOST:'192.168.1.26' },
          HIPSTORE:{NAME:'MS_HIPSTORE',HOST:'192.168.1.26' },
          HIUSTORE:{NAME:'MS_HIUSTORE',HOST:'192.168.1.26' }
}

export const ApplicationConfig={
     PATIENT_STORE:{PORT:3600},
     APP_STORE:{PORT:3601},
     HIPU_STORE:{PORT:3602},
     HIU_STORE:{PORT:3603},
     HPR_STORE:{PORT:3604},     
     NOTIFICATION_STORE:{PORT:3605},
     ACCOUNTS_STORE:{PORT:3606},
     SECURITY_SERVICE:{PORT:3608},
     ADMIN_API:{PORT:3800,PREFIX:'admin'},
     PHR_API:{PORT:3801},
     HPR_API:{PORT:3802},
     HIPU_API:{PORT:3803},
     NDHM:{PORT:3500},
     DEFAULT:{
             LISTEN_HOST:`0.0.0.0`,    
             TIMEOUT:4000,
             HOST:'192.168.1.26'
     }
}



export const HIP_STORE_OPTIONS = {
     host:process.env[EnvironmentNames.clientService.HIPU_STORE.HOST]||ApplicationConfig.DEFAULT.HOST,
     port:Number(process.env[EnvironmentNames.clientService.HIPU_STORE.PORT])||ApplicationConfig.HIPU_STORE.PORT,
 } 
 export const SECURITY_STORE_OPTIONS = {
     host:process.env[EnvironmentNames.clientService.SECURITY.HOST]||ApplicationConfig.DEFAULT.HOST,
     port:Number(process.env[EnvironmentNames.clientService.SECURITY.PORT])||ApplicationConfig.SECURITY_SERVICE.PORT,
 } 
 export const NDHM_STORE_OPTIONS = {
     host:process.env[EnvironmentNames.clientService.NDHM.HOST]||ApplicationConfig.DEFAULT.HOST,
     port:Number(process.env[EnvironmentNames.clientService.NDHM.PORT])||ApplicationConfig.NDHM.PORT,
 } 