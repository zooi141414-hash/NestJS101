import { Injectable } from '@nestjs/common';

// อัตราค่าบริการของแต่ละโจทย์ (ใช้ตรวจค่า zone/type ที่รับเข้ามาด้วย)
export const ZONE_FEES = { bangkok: 0, north: 10, south: 25 } as const;
export const FINE_RATES = { general: 5, reserve: 20, reference: 50 } as const;
export const SERVICE_CHARGES = { residential: 40, business: 90 } as const;

export type Zone = keyof typeof ZONE_FEES;
export type BookType = keyof typeof FINE_RATES;
export type MeterType = keyof typeof SERVICE_CHARGES;

const roundBaht = (n: number) => Math.round(n);

@Injectable()
export class Assignment337Service {
  shipping(weight: number, zone: Zone) {
    const kg = Math.ceil(weight); // ปัดเศษขึ้นเป็นกิโลกรัม
    const baseFee = roundBaht(50 + Math.max(kg - 1, 0) * 18); 
    const zoneFee = ZONE_FEES[zone];
    return { weight, zone, baseFee, zoneFee, total: roundBaht(baseFee + zoneFee) };
  }
  fine(days: number, type: BookType) {
    const chargeableDays = Math.max(days - 3, 0); 
    const rate = FINE_RATES[type];
    const total = roundBaht(Math.min(chargeableDays * rate, 500));
    return { days, type, chargeableDays, rate, total };
  }

  electricity(units: number, type: MeterType) {
    const firstTier = Math.min(units, 150);
    const secondTier = Math.max(units - 150, 0);
    const energyCharge = roundBaht(firstTier * 3 + secondTier * 4);
    const serviceCharge = SERVICE_CHARGES[type];
    return {
      units,
      type,
      energyCharge,
      serviceCharge,
      total: roundBaht(energyCharge + serviceCharge),
    };
  }
}
