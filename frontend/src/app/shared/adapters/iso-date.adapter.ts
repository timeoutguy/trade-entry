import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { formatUkDate, parseDateInput, parseDisplayDate } from '../utils/date.utils';

@Injectable()
export class IsoDateAdapter extends NativeDateAdapter {
  override parse(value: unknown): Date | null {
    if (typeof value === 'string') {
      return parseDisplayDate(value) ?? parseDateInput(value);
    }
    return super.parse(value as string);
  }

  override deserialize(value: unknown): Date | null {
    if (typeof value === 'string') {
      return parseDisplayDate(value) ?? parseDateInput(value);
    }
    if (value instanceof Date) {
      return value;
    }
    return super.deserialize(value);
  }

  override format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatUkDate(date);
    }
    return super.format(date, displayFormat);
  }
}
