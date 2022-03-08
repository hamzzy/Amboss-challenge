import { Test, TestingModule } from '@nestjs/testing';
import { EdgesResolver } from './edges.resolver';

describe('EdgesResolver', () => {
  let resolver: EdgesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EdgesResolver],
    }).compile();

    resolver = module.get<EdgesResolver>(EdgesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
