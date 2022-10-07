import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddHSPWorkderDTO, AppMessagePatterns, AssignHSPWorkerRoleDTO, DataInterface, FindOneHSPWorkderDTO, GetHSPWorkerRolesDTO, GetHSPWorkersDTO, UnAssignHSPWorkerRoleDTO } from '@openhmis-api/interfaces';
import { ManageHspworkerService } from './manage-hspworker.service';

@Controller()
export class ManageHspworkerController {
  constructor(
    private readonly workerService: ManageHspworkerService
  ) {}

  @MessagePattern(AppMessagePatterns.hipstore.users.getHSPWorkers)
  async getAllHSPWorkers(@Payload() {data}:DataInterface<GetHSPWorkersDTO>){
       return this.workerService.getHSPWorkers(data)
  }

  
  @MessagePattern(AppMessagePatterns.hipstore.users.findOneHSPWorker)
  async findHSPWorker(@Payload() {data}:DataInterface<FindOneHSPWorkderDTO>){
       return this.workerService.findOneHSPWorkder(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.users.addHSPWorker)
  async addHSPWorker(@Payload() {data}:DataInterface<AddHSPWorkderDTO>){
       return this.workerService.addHSPWorker(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.users.getHSPWorkerRoles)
  async getHSPWorkerRoles(@Payload() {data}:DataInterface<GetHSPWorkerRolesDTO>){
       return this.workerService.getHSPWorkerRoles(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.users.assignHSPWorkerRole)
  async assignHSPWorkerRole(@Payload() {data}:DataInterface<AssignHSPWorkerRoleDTO>){
       return this.workerService.assignHSPWorkerRole(data)
  }
  @MessagePattern(AppMessagePatterns.hipstore.users.unassignHSPWorkerRole)
  async unassignHSPWorkerRole(@Payload() {data}:DataInterface<UnAssignHSPWorkerRoleDTO>){
       return this.workerService.unAssignHSPWorkerRole(data)
  }


}
