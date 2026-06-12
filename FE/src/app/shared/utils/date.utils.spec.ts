import {
  enumerateCalendarMonths,
  formatDisplayDate,
  formatUkDate,
  formatYearMonth,
  parseDisplayDate,
  toDateInputValue,
} from './date.utils';

describe('date.utils', () => {
  it('formats display date as DD/MM/YY', () => {
    expect(formatDisplayDate('2025-06-10')).toBe('10/06/25');
  });

  it('formats UK date as DD/MM/YYYY', () => {
    expect(formatUkDate(new Date(2025, 5, 10))).toBe('10/06/2025');
  });

  it('parses UK date input', () => {
    const date = parseDisplayDate('10/06/2025');
    expect(date?.getFullYear()).toBe(2025);
    expect(date?.getMonth()).toBe(5);
    expect(date?.getDate()).toBe(10);
  });

  it('enumerates calendar months touched by tenor range', () => {
    const months = enumerateCalendarMonths('2025-03-15', '2025-05-31');
    expect(months.length).toBe(3);
    expect(toDateInputValue(months[0])).toBe('2025-03-01');
    expect(toDateInputValue(months[1])).toBe('2025-04-01');
    expect(toDateInputValue(months[2])).toBe('2025-05-01');
  });

  it('formats year month as YYMM', () => {
    expect(formatYearMonth(new Date(2025, 5, 1))).toBe('2506');
  });
});
