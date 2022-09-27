import { Test, TestingModule } from '@nestjs/testing';
import { ManageHipService } from './manage-hip.service';

describe('ManageHipService', () => {
  let service: ManageHipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageHipService],
    }).compile();

    service = module.get<ManageHipService>(ManageHipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
