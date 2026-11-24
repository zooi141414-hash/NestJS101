import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConverterService } from './converter.service.js';

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) { }

  @Get()
  // find() {
  //   console.log('1 เข้าสู่ Controller');
  //   const result = this.converterService.doWork();
  //   console.log('3 กลับมาที่ Controller');
  //   return result;   // ไม่ต้องแปลงเป็น JSON เอง
  // }
  
  convert(@Query('value') value?: string) {
    // 1 ค่าที่รับจากส่วนสอบถามเป็นข้อความเสมอ
    const num = Number(value);

    // 2 ตรวจความถูกต้องก่อนนำไปคำนวณ
    if (value === undefined || value === '' || Number.isNaN(num)) {
      throw new BadRequestException('value ต้องเป็นตัวเลข');
    }

    // 3 ส่งค่าที่ตรวจแล้วให้ Service คำนวณ
    return { value: num, result: this.converterService.convert(num) };
  }

}
