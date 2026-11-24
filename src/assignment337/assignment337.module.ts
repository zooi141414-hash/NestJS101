import { Module } from '@nestjs/common';
import { Assignment337Service } from './assignment337.service.js';
import { Assignment337Controller } from './assignment337.controller.js';

@Module({
  controllers: [Assignment337Controller],
  providers: [Assignment337Service],
})
export class Assignment337Module {}
