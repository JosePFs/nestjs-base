import { Test, TestingModule } from '@nestjs/testing';
import { TemplatesController } from './templates.controller';

describe('Templates Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TemplatesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TemplatesController = module.get<TemplatesController>(TemplatesController);
    expect(controller).toBeDefined();
  });
});
