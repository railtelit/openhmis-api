import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { AddHSPWorkderDTO, AssignHSPWorkerRoleDTO, FindOneHSPWorkderDTO, GetHSPWorkerRolesDTO, GetHSPWorkersDTO, UnAssignHSPWorkerRoleDTO } from '@openhmis-api/interfaces';
import { DataSource, Repository } from 'typeorm';
import { HSPOrganisation, HSPUser, HSPUserRole } from '../resource/entities';

@Injectable()
export class ManageHspworkerService {
     constructor(@InjectRepository(HSPUser) private userrepo:Repository<HSPUser>,
         @InjectRepository(HSPUserRole) private rolerepo:Repository<HSPUserRole>,
         @InjectRepository(HSPOrganisation) private orgrepo:Repository<HSPOrganisation>,
         @InjectDataSource() private con:DataSource  ){

     }

     async getHSPWorkers(query:GetHSPWorkersDTO){
         const {serviceid}=query
          const list = await this.userrepo.find({
                relations:{org:{hsp:true},},
                where:{
                    org:{hsp:{serviceid}}
                }
          })
          return list;
     }
     async findOneHSPWorkder(query:FindOneHSPWorkderDTO){
         return this.userrepo.findOneByOrFail({userid:query.userid})
     }

     async addHSPWorker(worker:AddHSPWorkderDTO){
        // Set org/role 
        const userExists= await this.findOneHSPWorkder({userid:worker.userid}); 
        if(userExists){
            throw new RpcException(`User Exists ${worker.userid}`);
        }
        const org = await this.orgrepo.findOneBy(worker.org);
        if(!org){
            throw new RpcException(`Invalid Org : ${worker.org.id}`)
        }
        const newWorkder = this.userrepo.create(worker); 
        const workerSaved = await  this.userrepo.save(worker);
        if(worker.primaryrole){
               const role =  this.rolerepo.create({user:workerSaved,
                 location:worker.location});
                await this.rolerepo.save(role)
        }
        return workerSaved
     }

     async getHSPWorkerRoles(query:GetHSPWorkerRolesDTO){
         return this.rolerepo.findBy({user:{userid:query.userid}})
     }

     async assignHSPWorkerRole(role:AssignHSPWorkerRoleDTO){
            const worker = await this.userrepo.
                    findOne({
                        where:{userid:role.userid},
                        relations:{userroles:true}
                    });
            const roleExists = worker.userroles.find(r=>r.role===role.role); 
            if(roleExists){
                 return roleExists
            };
            const newRole = this.rolerepo.create({
                user:worker,location:role.location,
                role:role.role
            }); 
            return this.rolerepo.save(newRole)
     }
     async unAssignHSPWorkerRole(unassign:UnAssignHSPWorkerRoleDTO){
            return this.rolerepo.delete(unassign.roleid)
     }
}
