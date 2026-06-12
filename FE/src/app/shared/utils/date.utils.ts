export function coerceDateInput(value: string | Date | null | undefined): string {
  if (value instanceof Date) {
    return toDateInputValue(value);
  }
  return value ?? '';
}

export function formatUkDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatDisplayDate(dateStr: string): string {
  const date = parseDisplayDate(dateStr);
  if (!date) {
    return dateStr;
  }
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

export function parseDisplayDate(dateStr: string): Date | null {
  if (!dateStr) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return parseDateInput(dateStr);
  }

  const ukMatch = dateStr.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
  if (!ukMatch) {
    return null;
  }

  const day = Number(ukMatch[1]);
  const month = Number(ukMatch[2]);
  let year = Number(ukMatch[3]);
  if (year < 100) {
    year += 2000;
  }

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDateInput(dateStr: string): Date | null {
  if (!dateStr) {
    return null;
  }
  const [year, month, day] = dateStr.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }
  return new Date(year, month - 1, day);
}

export function todayInputValue(): string {
  return toDateInputValue(new Date());
}

export function enumerateCalendarMonths(startStr: string, endStr: string): Date[] {
  const start = parseDateInput(startStr);
  const end = parseDateInput(endStr);
  if (!start || !end || end < start) {
    return [];
  }

  const months: Date[] = [];
  let cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= endMonth) {
    months.push(new Date(cursor));
    cursor = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1);
  }

  return months;
}

export function formatYearMonth(date: Date): string {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${year}${month}`;
}

export function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
