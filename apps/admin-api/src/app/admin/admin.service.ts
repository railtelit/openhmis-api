import { HttpException, Inject, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientConfig } from '@openhmis-api/config';
import { AppMessagePatterns, CreateUserInterface, DataInterface, GetDataInterface, PostDataInterface } from '@openhmis-api/interfaces';
import { delay, lastValueFrom, retry, tap, timeout } from 'rxjs';
import Axios from 'axios'
@Injectable()
export class AdminService {
        static scount=0
        private serviceMap:any={};
        private adminMap:any={}
        sequence = 1 ; 
        constructor(@Inject(ClientConfig.NDHM.NAME) private ndhmClient:ClientProxy,
                 @Inject(ClientConfig.SECURITY.NAME) private security:ClientProxy){
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
                        return this.adminMap[serviceid]
        }
        async initializeService(service:any){
                if(!this.serviceMap[service?.id]){
                        this.serviceMap[service?.id]={...service,serviceid:service?.id};
                }
                console.log(`After Init `, this.serviceMap)
                return this.serviceMap[service?.id]; 
        }

        async createServiceAdmin(create:CreateServiceAdminDTO){
                // 
                console.log(this.serviceMap)
                const service = this.serviceMap[create?.serviceid];
                const serviceid=create?.serviceid
                if(!service){
                        return null
                }
                const userExists=this.adminMap[create?.serviceid]; 
                if(userExists)return userExists; 
                service['stateCode']=create?.stateCode
                service['districtCode']=create?.districtCode
                this.serviceMap[serviceid]=service
                this.sequence++
                const username = `SA${create?.stateCode}${this.sequence.toString().padStart(3,'0')}`
                const client_roles={'react-app':['service-admin'].concat(service?.types||[]),
                                        'app-api':['service-admin']}
                const securityPayload:DataInterface={headers:{},
                        data:{username,password:'12345',client_roles,
                                realm:'openhmis-app'} as CreateUserInterface };
                const kcUser= await lastValueFrom(this.security.send(AppMessagePatterns.security.users.createAdminUser,
                        securityPayload)).catch(err=>{                                        
                                        throw new HttpException(`Internal Application Error ${err?.message} `,500)
                        }); 
                console.log(`KC User Created`,kcUser);
                const newUser= {userid:this.sequence,username,serviceid:service.id,stateCode:create?.stateCode}; 
                this.adminMap[serviceid]=newUser; 
                return newUser;
        }
       
}

export class CreateServiceAdminDTO{
        serviceid:string
        stateCode:string; 
        districtCode:string
}




