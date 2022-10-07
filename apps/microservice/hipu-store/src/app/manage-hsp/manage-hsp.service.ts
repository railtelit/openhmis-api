import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FindOneHSPDTO, SaveHSPDTO, setAdminUseridDTO, UnAssignAdminUserDTO } from '@openhmis-api/interfaces';
import { DataSource, ILike, IsNull, Repository } from 'typeorm';
import { HSPOrganisation } from '../resource/entities';
import { HealthServiceProvider } from '../resource/entities/health-service-provider.entity';

@Injectable()
export class ManageHspService implements OnApplicationBootstrap {
          private SEQUENCES = ['hsp_seq']
         constructor(@InjectRepository(HealthServiceProvider) private hsp:Repository<HealthServiceProvider>,
           @InjectRepository(HSPOrganisation) private orgrepo:Repository<HSPOrganisation>,
              private con:DataSource ){
         
         }
         async onApplicationBootstrap() {
             // ensure Sequence Generators are Ready 
            await Promise.all (  this.SEQUENCES.map( (seq)=> 
                    this.con.createQueryRunner().query(`CREATE SEQUENCE IF NOT EXISTS ${seq}`)
              )
            )
         }
         async getNextHSPSequence(){
               return this.con.createQueryRunner().query(`select nextval('hsp_seq'),currval('hsp_seq')`).then(r=> r?.[0] || {} )
         }
         async getAllHSP(){
                     return this.hsp.find()
         }

         async saveHSP(hsp:SaveHSPDTO){
                     // 
                     console.log(`Saving hsp `, hsp);
                     const hspCreate = this.hsp.create(hsp);                      
                     const hspSaved = await  this.hsp.save(hspCreate)
                     await this.orgrepo.findOneBy({hsp}).then( async (org)=>{
                         if(!org){
                              const org = await this.orgrepo.create({hsp:hspSaved,
                                       orgname:hspSaved.servicename,
                                           orgtype:'org', })
                              await this.orgrepo.save(org)
                         }
                         return org
                     })
                     return hspSaved
          }
         async findOneHSP(findRequest:FindOneHSPDTO){
                     //console.log(`Finding one `, findRequest)
                     return this.hsp.findOneBy(findRequest)
         }

         async setAdminuserid(req:setAdminUseridDTO){
              console.log(`Setting Admin user  `,req)
               const hsp = await this.hsp.findOneByOrFail({serviceid:req.serviceid});
               hsp.adminuserid=req.adminuserid
               hsp.districtCode=req.districtCode;
               hsp.stateCode=req.stateCode
               return this.hsp.save(hsp)
         }

         async unAssignAdminUser(req:UnAssignAdminUserDTO){
               const hsp = await this.hsp.findOneBy({serviceid:req.serviceid}); 
               hsp.adminuserid=null
               hsp.stateCode=null
               hsp.districtCode=null
               return this.hsp.save(hsp)
         }
}


export class HealthServiceProviderType extends  HealthServiceProvider{

}