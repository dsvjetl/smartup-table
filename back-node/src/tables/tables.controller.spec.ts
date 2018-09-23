import { Test, TestingModule } from '@nestjs/testing';
import { TablesController } from './tables.controller';

describe('Tables Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [TablesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: TablesController = module.get<TablesController>(TablesController);
    expect(controller).toBeDefined();
  });
});
