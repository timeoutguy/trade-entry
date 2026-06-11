import { TestBed } from '@angular/core/testing';
import { createDefaultTradeFormValue, TradeFormValue } from '../models/trade.models';
import { TradeCalculationService } from './trade-calculation.service';

describe('TradeCalculationService', () => {
  let service: TradeCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradeCalculationService);
  });

  it('counts calendar months between tenor dates', () => {
    expect(service.countCalendarMonths('2025-03-15', '2025-05-31')).toBe(3);
  });

  it('splits total quantity with remainder on last month', () => {
    expect(service.splitQuantity(100, 3, 'total')).toEqual([33, 33, 34]);
  });

  it('keeps per-month quantity on each row', () => {
    expect(service.splitQuantity(50, 3, 'perMonth')).toEqual([50, 50, 50]);
  });

  it('generates leg numbers from contract ref, month, and location', () => {
    const leg = service.generateLegNumber('ABC123', new Date(2025, 5, 1), 'France');
    expect(leg).toBe('ABC1232506France');
  });

  it('generates monthly commitments from trade form', () => {
    const trade: TradeFormValue = {
      ...createDefaultTradeFormValue(),
      contractRef: 'REF001',
      tradeLocation: 'France',
      tenorStart: '2025-03-15',
      tenorEnd: '2025-05-31',
      quantityMode: 'total',
      quantity: 100,
      trader: 'Maxime Florentin',
      client: 'Acme Trading Ltd',
      direction: 'Buy',
      deliveryUnit: 'T',
      quality: 'EN590',
      tolerance: '+/- 2%',
      toleranceOption: 'Buyer',
      incoterm: 'FOB',
      incotermLocations: ['Le Havre'],
      index: 'Platts CIF NWE',
      price: 100.5,
      premiumCurrency: 'USD',
      paymentType: 'LC',
      paymentDays: 30,
      paymentTrigger: 'BL Date',
      modeOfTransport: 'Truck',
    };

    const commitments = service.generateMonthlyCommitments(trade, 3);
    expect(commitments.length).toBe(3);
    expect(commitments.map((row) => row.quantity)).toEqual([33, 33, 34]);
    expect(commitments[0].legNumber).toBe('REF0012503France');
    expect(commitments[2].legNumber).toBe('REF0012505France');
  });
});
