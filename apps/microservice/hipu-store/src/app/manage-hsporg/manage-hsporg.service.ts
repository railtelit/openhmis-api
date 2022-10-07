import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHSPLocationDTO, CreateHSPOrgDTO, GetAllHSPOrgDTO, GetHSPLocationsDTO, RemoveHSPLocationDTO, SearchHSPLocationsDTO, UpdateHSPLocationDTO, UpdateHSPLocationStatusDTO } from '@openhmis-api/interfaces';
import { ILike, Repository } from 'typeorm';
import { HSPLocation, HSPOrganisation } from '../resource/entities';

@Injectable()
export class ManageHspOrgService implements OnApplicationBootstrap {
    constructor(@InjectRepository(HSPLocation) private locrepo:Repository<HSPLocation>,
             @InjectRepository(HSPOrganisation) private orgrepo:Repository<HSPOrganisation>       
    ){
        //
    }
    onApplicationBootstrap() {
        ///
    }
    async getAllHSPOrgs(find:GetAllHSPOrgDTO){
        return this.orgrepo.findBy({hsp:{serviceid:find.serviceid}})
    }
    async createHSPOrg(createRequest:CreateHSPOrgDTO){ 
        const orgExists = await this.orgrepo.findOne(
            {
                where:{hsp:createRequest.hsp,orgname:createRequest.orgname},
                relations:{hsp:true}
            }
        ); 
        if(orgExists){
            return orgExists
        }
        const newOrg = this.orgrepo.create(createRequest); 
        return this.orgrepo.save(newOrg)
    }
 
    async getAllHspLocations(search:GetHSPLocationsDTO){
            return this.locrepo.find({where:{org:{hsp:{serviceid:search.serviceid}}}})
    }

    async searchHSPLocations(query:SearchHSPLocationsDTO){
            // 
            return this.locrepo.find({
                 relations:{ org:{hsp:true} },
                 where:{
                     locationname:ILike(`%${query.name}%`),
                     org:{hsp:{serviceid:query.serviceid}}
                 }
            })
    }

    async createHSPLocation(create:CreateHSPLocationDTO){
        //
        const nameExists = await this.locrepo.findOneBy({locationname:create.locationname}); 
        if(nameExists){
            return nameExists;
        }
        const newLocation = this.locrepo.create(create);
        return this.locrepo.save(newLocation);

    }

    async updateHSPLocationStatus(status:UpdateHSPLocationStatusDTO){
            //
            const loc = await this.locrepo.findOneBy({id:status.id}); 
            loc.status = status.status; 
            return  this.locrepo.save(loc)
    }

    async  removeHSPLocation(remove:RemoveHSPLocationDTO){
            const loctoRemove= await this.locrepo.findOneBy({id:remove.id}); 
            if(loctoRemove){
                 return this.locrepo.delete(remove.id)
            }
            return null;
    }

    async updateHSPLocation(update:UpdateHSPLocationDTO){
        const loc = await this.locrepo.findOneBy({id:update.id}); 
        if(!loc)return new RpcException(`No Record Found `);
        return this.locrepo.update(loc.id,update)
    }
}
