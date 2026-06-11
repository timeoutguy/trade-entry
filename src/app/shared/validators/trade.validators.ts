import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { coerceDateInput, parseDateInput } from '../utils/date.utils';

function toDate(value: string | Date | null | undefined): Date | null {
  if (value instanceof Date) {
    return value;
  }
  return parseDateInput(coerceDateInput(value));
}

export function notFutureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string | Date;
    if (!value) {
      return null;
    }
    const date = toDate(value);
    if (!date) {
      return { invalidDate: true };
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      return { futureDate: true };
    }
    return null;
  };
}

export function tenorEndValidator(startControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const end = toDate(control.value as string | Date);
    const start = toDate(control.parent?.get(startControlName)?.value as string | Date);
    if (!end || !start) {
      return null;
    }
    if (end < start) {
      return { tenorEndBeforeStart: true };
    }
    return null;
  };
}

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '' || value === undefined) {
      return null;
    }
    const num = Number(value);
    if (!Number.isInteger(num) || num < 0) {
      return { integer: true };
    }
    return null;
  };
}

export function minArrayLength(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as unknown[];
    if (!Array.isArray(value) || value.length < min) {
      return { minArrayLength: { required: min, actual: value?.length ?? 0 } };
    }
    return null;
  };
}

export function twoDecimalPlacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '' || value === undefined) {
      return null;
    }
    const num = Number(value);
    if (Number.isNaN(num) || num < 0) {
      return { twoDecimals: true };
    }
    if (!/^\d+(\.\d{1,2})?$/.test(String(value))) {
      return { twoDecimals: true };
    }
    return null;
  };
}
