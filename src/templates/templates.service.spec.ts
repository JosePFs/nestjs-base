import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesService } from './templates.service';

describe('TemplatesService', () => {
  let service: TemplatesService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplatesService],
    }).compile();
    service = module.get<TemplatesService>(TemplatesService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
