 
 
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { Credentials } from '@keycloak/keycloak-admin-client/lib/utils/auth';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { EnvironmentNames } from '@openhmis-api/config';


@Injectable()
export class KcadminclientService   {
        private credentials:Credentials={
            clientId:process.env[EnvironmentNames.keycloak.SECURITY.CLIENTID],
            grantType:'client_credentials',
            clientSecret:process.env[EnvironmentNames.keycloak.SECURITY.CLIENTSECRET]
        }
        private init_config={
                baseUrl:process.env[EnvironmentNames.keycloak.SECURITY.KEYCLOAK_URL],
                realmName:`openhmis-app`,
                
        }
        private kcadmin:KeycloakAdminClient
        constructor(){
             this.kcadmin= new KeycloakAdminClient(this.init_config)
                console.log(this.init_config)
        }

       
       async refreshToken(){
                console.log(`Refresing Token with Auth`);
                this.kcAdminClient.auth(this.credentials).then(()=>{
                    console.log(this.kcadmin.accessToken)
                     setTimeout( ()=>{
                             this.refreshToken();
                     }, 6000 * 10 * 4 )
                } ).catch(err=>{
                     console.error(`Unable to Refresh `,)
                })
        }
  
        
        public get kcAdminClient() : KeycloakAdminClient {
            return this.kcadmin
        }  

        private async  authenticate(){
             ///
             console.log(this.credentials)
             this.kcadmin.auth(this.credentials).catch(err=>{
                 console.error(`Erro`,err.message)
             }).then( ()=>{
                 console.log(this.kcAdminClient.accessToken)
             } )
        }
        onModuleInit() {
            //
                 this.authenticate();
                 setTimeout(()=>{
                     this.refreshToken();
                 },60000);
        }

}
