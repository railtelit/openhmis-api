import RoleRepresentation, { RoleMappingPayload } from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InvalidRequestError } from '@openhmis-api/config';
import { CreateKCUserIfNotExistsDTO, CreateUserInterface, DataInterface, FindOneKCUserDTO, GetKCUserClientRolesDTO, RemoveKCUserRoleDTO, SecurityRemoveUserDTO } from '@openhmis-api/interfaces';
import { SecurityRealms } from '../config';
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
                return (await  this.adminservice.kcAdminClient.clients.find({clientId:clientName}))?.[0]
        }

        async removeUser(remove:SecurityRemoveUserDTO){
                const {username}=remove;
                const sResults = await this.adminservice.kcAdminClient.users.find({username})
                if(sResults?.length==1){
                        await this.adminservice.kcAdminClient.users.del({id:sResults[0].id}); 
                        console.log(`UserRemoved  ${username}`)
                        return sResults[0]
                }else{
                         throw new RpcException(`No User Found ${username}`)
                }
                return null
        }

        async ensureRoleExists(checkRoles:{realm:string,clientid:string,roles:string[] }){
                const {clientid,realm}=checkRoles
                console.log('listing ROles',checkRoles,clientid,realm);
                const KCclient = (await  this.adminservice.kcAdminClient.clients.find({clientId:clientid}))?.[0]
                
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

        async findOneKeycloakUser(find:FindOneKCUserDTO){
                const searchResults  = await this.adminservice.kcAdminClient.users.find({username:find.username,realm:SecurityRealms.reactApp,})
                                                .catch(err=> [] )
                return  searchResults?.[0] 
        }
        async findOneClient(clientId:string){
               const list =  await this.adminservice.kcAdminClient.clients.find({clientId})
               return list?.[0]
        }
        async createUserIfNotExists(pl:CreateKCUserIfNotExistsDTO){
                
                 const userExists = await this.findOneKeycloakUser({username:pl.username});; 
                 console.log(`User Search `,pl,userExists)
                 if(userExists){
                                return userExists;
                 }
                 const realm=SecurityRealms.reactApp;
                 const {username,email,password,roles}=pl
                 const createState={username,email}
                 console.log(`Createing KCUER`,createState)
                 const newUser=  await this.adminservice.kcAdminClient.users.create({realm:SecurityRealms.reactApp,
                                        enabled:true,
                                        ...createState,credentials:[{temporary:false,type:'password',value:password}]
                                });
                 console.log(`New User Added `,newUser);
                 const newUserInstance = await this.adminservice.kcAdminClient.users.findOne({id:newUser.id}); 
                const uiClientRoles =  await this.ensureRoleExists({realm,clientid:'react-app',roles})
                const apiClientRoles =  await this.ensureRoleExists({realm,clientid:'app-api',roles}); 
                await this.assignClientRoles({userid:newUserInstance.id, clientName:'react-app',roles:uiClientRoles as RoleMappingPayload[],realm });
                await this.assignClientRoles({userid:newUserInstance.id, clientName:'app-api',roles:apiClientRoles as RoleMappingPayload[],realm });
                 
                 return newUserInstance
        }
        async getUserClientRoles(query:GetKCUserClientRolesDTO){
                const kcUser=await this.findOneKeycloakUser({username:query.username});
                const kcClient = await this.findOneClient(query.clientId)
                return this.adminservice.kcAdminClient.users.listClientRoleMappings({clientUniqueId:kcClient.id,id:kcUser.id,realm:SecurityRealms.reactApp})
        }
         

        async removeUserRole(pl:RemoveKCUserRoleDTO){
                const realm=SecurityRealms.reactApp
                const kcUser = await this.findOneKeycloakUser({username:pl.username});
                if(!kcUser.id){
                                throw new RpcException(`Invalid UserName :${pl.username}`);
                }
               const kcClient = await this.findOneClient(pl.clientId); 
               if(!kcClient) throw new RpcException(`Invalid Clientid ${pl.clientId}`);

               const rolesMappings = await  this.adminservice.kcAdminClient.users.listClientRoleMappings({id:kcUser.id,clientUniqueId:kcClient.id,realm}); 
                console.log(`RoleMappings `,rolesMappings)
                const roleToRemove = rolesMappings.filter(r => pl.rolenames.find( rr=> rr===r.name )!==undefined  );
                
               return  this.adminservice.kcAdminClient.users.delRealmRoleMappings({ id:kcUser.id,roles:roleToRemove as RoleMappingPayload[]  })
        }
}