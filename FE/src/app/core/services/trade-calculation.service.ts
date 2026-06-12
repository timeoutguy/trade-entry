import { Injectable } from '@angular/core';
import {
  MonthlyCommitment,
  QuantityMode,
  TradeFormValue,
} from '../models/trade.models';
import {
  enumerateCalendarMonths,
  formatYearMonth,
  toDateInputValue,
} from '../../shared/utils/date.utils';

@Injectable({ providedIn: 'root' })
export class TradeCalculationService {
  countCalendarMonths(tenorStart: string, tenorEnd: string): number {
    return enumerateCalendarMonths(tenorStart, tenorEnd).length;
  }

  generateLegNumber(contractRef: string, commitmentMonth: Date, tradeLocation: string): string {
    const yymm = formatYearMonth(commitmentMonth);
    return `${contractRef}${yymm}${tradeLocation}`;
  }

  splitQuantity(total: number, monthCount: number, mode: QuantityMode): number[] {
    if (monthCount <= 0) {
      return [];
    }
    if (mode === 'perMonth') {
      return Array(monthCount).fill(total);
    }
    const base = Math.floor(total / monthCount);
    const remainder = total % monthCount;
    return Array.from({ length: monthCount }, (_, index) =>
      index === monthCount - 1 ? base + remainder : base
    );
  }

  generateMonthlyCommitments(
    trade: TradeFormValue,
    monthCount: number
  ): MonthlyCommitment[] {
    const months = enumerateCalendarMonths(trade.tenorStart, trade.tenorEnd);
    const effectiveMonths =
      monthCount > 0 && monthCount !== months.length
        ? months.slice(0, monthCount)
        : months;

    const quantities = this.splitQuantity(
      trade.quantity ?? 0,
      effectiveMonths.length,
      trade.quantityMode
    );

    return effectiveMonths.map((monthDate, index) => ({
      ...trade,
      commitmentMonth: toDateInputValue(monthDate),
      monthIndex: index + 1,
      legNumber: this.generateLegNumber(
        trade.contractRef,
        monthDate,
        trade.tradeLocation
      ),
      quantity: quantities[index] ?? trade.quantity,
    }));
  }
}
