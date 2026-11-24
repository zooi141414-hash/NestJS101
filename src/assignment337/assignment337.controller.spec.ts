import { Test, TestingModule } from '@nestjs/testing';
import { Assignment337Controller } from './assignment337.controller.js';
import { Assignment337Service } from './assignment337.service.js';

describe('Assignment337Controller', () => {
  let controller: Assignment337Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Assignment337Controller],
      providers: [Assignment337Service],
    }).compile();

    controller = module.get<Assignment337Controller>(Assignment337Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
