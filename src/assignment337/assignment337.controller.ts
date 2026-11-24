import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import {
  Assignment337Service,
  BookType,
  FINE_RATES,
  MeterType,
  SERVICE_CHARGES,
  Zone,
  ZONE_FEES,
} from './assignment337.service.js';

function parseNumber(name: string, value: string | undefined, rule: 'positive' | 'nonNegativeInt'): number {
  const message =
    rule === 'positive'
      ? `${name} ต้องเป็นตัวเลขมากกว่า 0`
      : `${name} ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป`;

  // ไม่ส่งพารามิเตอร์ หรือส่งค่าว่าง
  if (value === undefined || value.trim() === '') throw new BadRequestException(message);

  // แปลงเป็นตัวเลขไม่ได้
  const num = Number(value);
  if (!Number.isFinite(num)) throw new BadRequestException(message);

  // อยู่นอกขอบเขตที่โจทย์กำหนด
  if (rule === 'positive' && num <= 0) throw new BadRequestException(message);
  if (rule === 'nonNegativeInt' && (!Number.isInteger(num) || num < 0)) {
    throw new BadRequestException(message);
  }
  return num;
}

function parseChoice<T extends string>(name: string, value: string | undefined, table: Record<T, number>): T {
  const choices = Object.keys(table);
  if (value === undefined || !choices.includes(value)) {
    throw new BadRequestException(`${name} ต้องเป็น ${choices.join(', ')}`);
  }
  return value as T;
}

@Controller()
export class Assignment337Controller {
  constructor(private readonly assignment337Service: Assignment337Service) {}

  @Get('shipping')
  shipping(@Query('weight') weight?: string, @Query('zone') zone?: string) {
    const w = parseNumber('weight', weight, 'positive');
    const z = parseChoice<Zone>('zone', zone, ZONE_FEES);
    return this.assignment337Service.shipping(w, z);
  }

  @Get('fine')
  fine(@Query('days') days?: string, @Query('type') type?: string) {
    const d = parseNumber('days', days, 'nonNegativeInt');
    const t = parseChoice<BookType>('type', type, FINE_RATES);
    return this.assignment337Service.fine(d, t);
  }

  @Get('electricity')
  electricity(@Query('units') units?: string, @Query('type') type?: string) {
    const u = parseNumber('units', units, 'nonNegativeInt');
    const t = parseChoice<MeterType>('type', type, SERVICE_CHARGES);
    return this.assignment337Service.electricity(u, t);
  }
}
