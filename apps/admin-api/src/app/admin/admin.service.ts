import { BadRequestException, HttpException, Inject, Injectable, NotFoundException, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { AppMessagePatterns, CreateUserInterface, DataInterface, FindOneHSPDTO, GetDataInterface, PostDataInterface, SaveHSPDTO, SecurityRemoveUserDTO, setAdminUseridDTO, UnAssignAdminUserDTO } from '@openhmis-api/interfaces';
import { delay, last, lastValueFrom, retry, tap, timeout } from 'rxjs';
import Axios from 'axios'
import { IsNotEmpty } from 'class-validator';
@Injectable()
export class AdminService {
        static scount=0
        private serviceMap:any={};
        private adminMap:any={}
        sequence = 1 ; 
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy,
                 @Inject(ClientConfig.SECURITY.NAME) private security:ClientProxy ,
                 @Inject(ClientConfig.HIPSTORE.NAME) private hipClient:ClientProxy 

                 ){
                AdminService.scount++;
        }

        async verifyHeartbeat(){
                  const services =   await  lastValueFrom ( await this.getServices())
                  console.log(`Checking heartbeat`,services,`${services?.bridge?.url}/v0.5/heartbeat`)
                  return  (await Axios.get(`${services?.bridge?.url}/v0.5/heartbeat`)).data
        }
        
        async getStates(){
                const payload:GetDataInterface={context:`v1/ha/lgd/states`,domain:`HEALTHID`,params:{},headers:{},data:{}}
                const list = await  this.ndhmClient.send({METHOD:'GET'},payload ) ; 
                return list  
        }
    
        async getDistricts({stateCode}:any){
                const payload:GetDataInterface={context:`v1/ha/lgd/districts?stateCode=${stateCode}`,
                domain:`HEALTHID`,params:{},headers:{},data:{}}
                const list = await  this.ndhmClient.send({METHOD:'GET'},payload ) ; 
                return list  
        }
        async getServices(){
                await this.ndhmClient.connect();  
                console.log(`Service Counts `,AdminService.scount)      
                const payload:PostDataInterface = {context:'v1/bridges/getServices',domain:'GATEWAY',data:{},headers:{}}
                return this.ndhmClient.send({METHOD:'GET'},payload).pipe(  
                        timeout(4200),                        
                        delay(200),
                        retry(1),
                         tap(_=>{
                                 //console.log(this.ndhmClient)
                                 // Use Redis Cache for future Queries to Serve in Case of Error 
                         }) )
        }
        async getServiceAdmin(serviceid:string){
                        const pr:DataInterface<FindOneHSPDTO> = {headers:{},data:{serviceid}}
                        return this.hipClient.send(AppMessagePatterns.hipstore.hsp.findOneHSP,pr)
        }
        async initializeService(service:any){
                ///Take Request From 
                const {id,name}=service
                const hspExists = await lastValueFrom(
                        this.hipClient.send(AppMessagePatterns.hipstore.hsp.findOneHSP,
                                        {data:{serviceid:id}} as DataInterface<FindOneHSPDTO> )
                        )
                if(hspExists?.serviceid){
                        return hspExists
                }
                const hsp:SaveHSPDTO =  {  serviceid:id, email:'',servicename:name,suffix:'',
                                                service_types: service?.types||[]  }
                const payload:DataInterface<SaveHSPDTO> = { headers:{}, data:hsp }; 
                
                return this.hipClient.send(AppMessagePatterns.hipstore.hsp.saveHSP, payload )
 
        }

        async createServiceAdmin(create:CreateServiceAdminDTO){
                // 
                console.log(this.serviceMap)
                // const service = this.serviceMap[create?.serviceid];
                const serviceid=create.serviceid
                const service =  await     lastValueFrom( this.hipClient.send(AppMessagePatterns.hipstore.hsp.findOneHSP, 
                        {headers:{},data:{serviceid:create.serviceid}} as DataInterface<FindOneHSPDTO> ) ) 
                
                if(!service){
                        return null
                }
                const userExists=this.adminMap[create?.serviceid]; 
                if(userExists)return userExists; 
                service['stateCode']=create?.stateCode
                service['districtCode']=create?.districtCode
                this.serviceMap[serviceid]=service
                //this.sequence++
                this.sequence= (await lastValueFrom(this.hipClient.send(AppMessagePatterns.hipstore.hsp.getNextHSPSequence,{}))).nextval

                const username = `SA${create?.stateCode}${this.sequence.toString().padStart(3,'0')}`
                const client_roles={'react-app':['service-admin'].concat(service?.service_types||[]),
                                        'app-api':['service-admin']}
                const securityPayload:DataInterface={headers:{},
                        data:{username,password:'12345',client_roles,
                                realm:'openhmis-app'} as CreateUserInterface };
                const kcUser= await lastValueFrom(this.security.send(AppMessagePatterns.security.users.createAdminUser,
                        securityPayload)).catch(err=>{                                        
                                        throw new HttpException(`Internal Application Custom Error ${err?.message} `,500)
                        }); 
                console.log(`KC User Created`,kcUser);
                // const newUser= {userid:this.sequence,username,serviceid:service.id,stateCode:create?.stateCode};
                // await this.hipClient.send(AppMessagePatterns.hipstore.hsp.saveHSP,{data:},headers:{}} as DataInterface<SaveHSPDTO>) 
                // Update 
                const setAdminUser:DataInterface<setAdminUseridDTO>={headers:{},
                        data:{adminuserid:username,serviceid:create.serviceid,
                                districtCode:create.districtCode,
                                stateCode:create.stateCode}}
                const newUser = await this.hipClient.send(AppMessagePatterns.hipstore.hsp.setAdminuserid,setAdminUser)
                //this.adminMap[serviceid]=newUser; 
                await this.ensureHSPAdminUser(newUser).catch(err=>{
                                 console.error(err)
                })
                return newUser;
        }

        async ensureHSPAdminUser(hsp:any){
                /// 
                const {adminuserid}=hsp; 
                //const admin_location = await this.hipClient.send(AppMessagePatterns.hipstore.hsporg)
        }

        async unAssignAdminUser(data:UnAssignAdminUserDTO){ 
                const {serviceid}=data
                const pr:DataInterface<UnAssignAdminUserDTO>={ headers:{},data};
                const hsp  = await lastValueFrom ( this.hipClient.send(AppMessagePatterns.hipstore.hsp.findOneHSP,
                                {data:{serviceid}} as DataInterface<FindOneHSPDTO> ));
                if(!hsp?.adminuserid){
                        throw new BadRequestException(`Invalid Service Id ${serviceid}`);
                }
                const userRemoved = await lastValueFrom(this.security.send(AppMessagePatterns.security.users.removeUser,
                                {headers:{},data:{username:hsp.adminuserid }} as DataInterface<SecurityRemoveUserDTO>)
                )
                console.log(userRemoved);
                if(!userRemoved?.username){
                        throw new NotFoundException(`Admin User Not Found ${serviceid}`)
                }
                return this.hipClient.send(AppMessagePatterns.hipstore.hsp.unAssignAdminuser,pr)
          }
       
}

export class CreateServiceAdminDTO{
        @IsNotEmpty()
        serviceid:string
        stateCode:string; 
        districtCode:string
}

