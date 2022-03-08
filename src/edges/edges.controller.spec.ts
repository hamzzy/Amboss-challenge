import { Test, TestingModule } from '@nestjs/testing';

describe('EdgesController', () => {
  let controller: EdgesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EdgesController],
    }).compile();

    controller = module.get<EdgesController>(EdgesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
