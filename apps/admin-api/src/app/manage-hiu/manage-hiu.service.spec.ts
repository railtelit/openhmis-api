import { Test, TestingModule } from '@nestjs/testing';
import { ManageHiuService } from './manage-hiu.service';

describe('ManageHiuService', () => {
  let service: ManageHiuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageHiuService],
    }).compile();

    service = module.get<ManageHiuService>(ManageHiuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
