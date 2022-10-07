import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppMessagePatterns, AppMessagePatternsTypes, DataInterface, FindOneHSPDTO, SaveHSPDTO, setAdminUseridDTO, UnAssignAdminUserDTO } from '@openhmis-api/interfaces';
import { ManageHspService } from './manage-hsp.service';
const HSP_PATTERNS=  AppMessagePatterns.hipstore.hsp
const HSP_PATTERNS_TYPE=  AppMessagePatternsTypes.hipstore.hsp
@Controller()
export class ManageHspController {
  constructor(private readonly manageHspService: ManageHspService) {

  }

  @MessagePattern(HSP_PATTERNS.getNextHSPSequence)
  async getNextHSPSeq(@Payload()  payload:DataInterface  ) {
    
    return  this.manageHspService.getNextHSPSequence()
  }
  @MessagePattern(HSP_PATTERNS.getAllHSP)
  async getAllHSP(@Payload()  payload:DataInterface  ) {
    
    return  this.manageHspService.getAllHSP()
  }

  @MessagePattern(HSP_PATTERNS.findOneHSP)
  async findOneHSP(@Payload() payload:DataInterface<FindOneHSPDTO> ){
        const request = payload.data
        return this.manageHspService.findOneHSP(request)
  }
  @UsePipes(new ValidationPipe({transform:true}))
  @MessagePattern(HSP_PATTERNS.saveHSP)
  async saveHSP(@Payload() payload:DataInterface<SaveHSPDTO>){
       return this.manageHspService.saveHSP(payload.data)
  }
  @MessagePattern(HSP_PATTERNS.setAdminuserid)
  async setAdminUserid(@Payload() pr:DataInterface<setAdminUseridDTO>){
      console.log(`In SetAdmin user `,pr)
       const  req_data = pr.data; 
       return this.manageHspService.setAdminuserid(req_data)
  }
  @MessagePattern(HSP_PATTERNS.unAssignAdminuser)
  async unAssignAdmin(@Payload() pr:DataInterface<UnAssignAdminUserDTO>){
      
       const  req_data = pr.data; 
       return this.manageHspService.unAssignAdminUser(req_data)
  }
  
}
