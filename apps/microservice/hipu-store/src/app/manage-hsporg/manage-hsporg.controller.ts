import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppMessagePatterns, CreateHSPLocationDTO, CreateHSPOrgDTO, DataInterface, FindOneHSPOrgDTO, GetAllHSPOrgDTO, GetHSPLocationsDTO, RemoveHSPLocationDTO, SearchHSPLocationsDTO, UpdateHSPLocationDTO, UpdateHSPLocationStatusDTO } from '@openhmis-api/interfaces';
import { ManageHspOrgService } from './manage-hsporg.service';

@Controller()
export class ManageHspOrgController {
  constructor(
    private readonly orgService: ManageHspOrgService
  ) {}

  @MessagePattern(AppMessagePatterns.hipstore.hsporg.getAllHSPOrg)
  async getAllHSPOrg(@Payload() {data}:DataInterface<GetAllHSPOrgDTO>){
    return  this.orgService.getAllHSPOrgs(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.createHSPOrg)
  async createHSPOrg(@Payload() {data}:DataInterface<CreateHSPOrgDTO>){
       return this.orgService.createHSPOrg(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.findOneHSPOrg)
  async findOneHSPOrg(@Payload() {data}:DataInterface<FindOneHSPOrgDTO>){
       return this.orgService.findOneHSPOrg(data)
  }


  @MessagePattern(AppMessagePatterns.hipstore.hsporg.getHSPLocations)
  async getHSPLocations(@Payload() {data}:DataInterface<GetHSPLocationsDTO>){      
      return this.orgService.getAllHspLocations(data)
  } 
 
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.searchHSPLocations)
  async searchHSPLocations(@Payload() {data}:DataInterface<SearchHSPLocationsDTO>){      
      return this.orgService.searchHSPLocations(data)
  } 

  @MessagePattern(AppMessagePatterns.hipstore.hsporg.createHSPLocation)
  async createHSPLocation(@Payload() {data}:DataInterface<CreateHSPLocationDTO>){      
      return this.orgService.createHSPLocation(data)
  }
  
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.updateHSPLocationStatus)
  async updateHSPLocStatus(@Payload() {data}:DataInterface<UpdateHSPLocationStatusDTO>){      
      return this.orgService.updateHSPLocationStatus(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.removeHSPLocation)
  async removeHSPLoc(@Payload() {data}:DataInterface<RemoveHSPLocationDTO>){      
      return this.orgService.removeHSPLocation(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.hsporg.updateHSPLocation)
  async updateHSPLoc(@Payload() {data}:DataInterface<UpdateHSPLocationDTO>){      
      return this.orgService.updateHSPLocation(data)
  }

}
