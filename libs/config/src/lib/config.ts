
export const EnvironmentNames={
  database:{
     MONGO:{
         HOST:'MONGODB_HOST',PORT:'MONGODB_PORT',USER:"MONGODB_USER",PASSWORD:"MONGODB_PASSWORD"
     },
     DEFAULT:{
         HOST:'192.168.1.26'
     }
  },
  PORT:'PORT'
}
export const DatabaseConfig={
  MONGO:{ DEFAULT_HOST:`192.168.1.26`,PORT:27017, 
     DEFAULT_USERNAME:`admin`,DEFAULT_PASSWORD:`admin` }
}
export const DatabaseNames={
     NDHM:'ndhm',
     PATIENT:'patient'
}

export const ApplicationConfig={
     PATIENT_STORE:{PORT:3600},
     APP_STORE:{PORT:3601},
     HIP_STORE:{PORT:3602},
     HIU_STORE:{PORT:3603},
     HPR_STORE:{PORT:3604},
     NOTIFICATION_STORE:{PORT:3605},
     ACCOUNTS_STORE:{PORT:3606},

     ADMIN_API:{PORT:3800},
     PHR_API:{PORT:3801},
     HPR_API:{PORT:3802},
     HIPU_API:{PORT:3803},

     DEFAULT:{
             LISTEN_HOST:`0.0.0.0`
     }
}