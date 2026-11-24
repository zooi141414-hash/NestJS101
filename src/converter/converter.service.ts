import { Injectable } from '@nestjs/common';

@Injectable()
export class ConverterService {
    doWork() {
        console.log('2 เข้าสู่ Service');
        return { ok: true };
    }

    convert(value: number): number {
        return value * 5;
    }

}
