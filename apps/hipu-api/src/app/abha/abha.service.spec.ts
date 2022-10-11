import { Test, TestingModule } from '@nestjs/testing';
import { AbhaService } from './abha.service';

describe('AbhaService', () => {
  let service: AbhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbhaService],
    }).compile();

    service = module.get<AbhaService>(AbhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
