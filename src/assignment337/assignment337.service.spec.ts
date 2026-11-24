import { Test, TestingModule } from '@nestjs/testing';
import { Assignment337Service } from './assignment337.service.js';

describe('Assignment337Service', () => {
  let service: Assignment337Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Assignment337Service],
    }).compile();

    service = module.get<Assignment337Service>(Assignment337Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
