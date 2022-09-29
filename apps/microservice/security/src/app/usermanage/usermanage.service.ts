import RoleRepresentation, { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import { Injectable } from '@nestjs/common';
import { InvalidRequestError } from '@openhmis-api/config';
import { CreateUserInterface, DataInterface } from '@openhmis-api/interfaces';
import { KcadminclientService } from '../kcadminclient/kcadminclient.service';

@Injectable()
export class UsermanageService {
        constructor(private adminservice:KcadminclientService){

        }

        async getAllUsers(){
                console.log(`Finding All Users `);
                return this.adminservice.kcAdminClient.users.find()
        }
        async getClientByName(clientName:string){
                return (await  this.adminservice.kcAdminClient.clients.find({clientId:clientName})).at(0)
        }

        async ensureRoleExists(checkRoles:{realm:string,clientid:string,roles:string[] }){
                const {clientid,realm}=checkRoles
                console.log('listing ROles',checkRoles);
                const KCclient = (await  this.adminservice.kcAdminClient.clients.find({clientId:clientid})).at(0)
                if(!KCclient){
                        console.log(`Client Not EXISTS`); return  ;
                }
                const id = KCclient.id
                const roles_present = await this.adminservice.kcAdminClient.clients.listRoles({id,realm}); 
                console.log(`Present Roles`,roles_present)
                const not_present = checkRoles.roles.filter(r=>  roles_present.find( s=>s.name==r )===undefined ); 
                console.log(`NotPRESENT ROLES`,not_present,clientid,realm)
                const createRoles= await  Promise.all(not_present.map(role=> this.adminservice.kcAdminClient.clients.createRole({id,
                        realm,name:role,description:role,}).catch(err=>console.log(`Error Create Role ${role} `)) ) );
                const roles_present_confirm = await this.adminservice.kcAdminClient.clients.listRoles({id,realm}); 
                return roles_present_confirm.filter(crole=> checkRoles.roles.find(r=> r===crole.name)  )
        }

        async assignClientRoles(assignment:{userid:string,clientName:string,roles:RoleMappingPayload[],realm:string}){
                const KCclient = await  this.getClientByName(assignment.clientName); 
                if(!KCclient){
                         console.error(`No Client for Assign Roles  ${assignment.userid};`);return ;
                }
                const {userid,clientName,roles,realm}=assignment
                
                return this.adminservice.kcAdminClient.users.addClientRoleMappings({id:userid,clientUniqueId:KCclient.id,realm,
                                roles }  )
        }

        async createAdminUser(payload:DataInterface){
                 const {data:{username,email,realm='openhmis-app',password,client_roles } }:{data:CreateUserInterface}=payload 
                 const uiRoles=client_roles['react-app']||[]
                 const apiRoles=client_roles['app-api']||[]; 
                 try{
                         console.log('Checking Roles',uiRoles,apiRoles)
                         const createdUiRoles= await this.ensureRoleExists({realm,clientid:'react-app',roles:uiRoles})
                         const createdApiRoles = await this.ensureRoleExists({realm,clientid:'app-api',roles:apiRoles})
                         console.log(`Roles Synced `, createdUiRoles,createdApiRoles)
                 if(email){

                         const userExists = await this.adminservice.kcAdminClient.users.find({email,realm}); 
                         if(userExists.length>0){
                                 throw new InvalidRequestError(`User Exists With Email ${email} `)
                                }
                }
                 //this.adminservice.kcAdminClient.users
                 const newUser=  await  this.adminservice.kcAdminClient.users.create(
                                { 
                                enabled:true,
                                realm,username,email,
                                credentials:[{type:'password',temporary:false,value:password,}] 
                                }) ; 
                                // Assign Role 
                        await this.assignClientRoles({userid:newUser.id,clientName:'react-app',
                                roles:createdUiRoles as RoleMappingPayload[],realm}) ;
                        await this.assignClientRoles({userid:newUser.id,clientName:'app-api',
                                roles:createdApiRoles as RoleMappingPayload[],realm }) ;

                        return newUser;  
                }catch(e){
                         ///
                         console.error(e)
                }
        }
}