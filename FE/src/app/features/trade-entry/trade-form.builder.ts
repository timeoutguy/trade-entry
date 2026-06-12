import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createDefaultTradeFormValue } from '../../core/models/trade.models';
import {
  integerValidator,
  minArrayLength,
  notFutureDateValidator,
  tenorEndValidator,
  twoDecimalPlacesValidator,
} from '../../shared/validators/trade.validators';
import { todayInputValue } from '../../shared/utils/date.utils';

export function buildTradeForm(fb: FormBuilder): FormGroup {
  const defaults = createDefaultTradeFormValue();

  return fb.group({
    tradeDate: [defaults.tradeDate, [Validators.required, notFutureDateValidator()]],
    contractRef: [defaults.contractRef, Validators.required],
    trader: [defaults.trader, Validators.required],
    tradeLocation: [defaults.tradeLocation, Validators.required],
    tenorStart: [defaults.tenorStart, Validators.required],
    tenorEnd: [defaults.tenorEnd, [Validators.required, tenorEndValidator('tenorStart')]],
    client: [defaults.client, Validators.required],
    direction: [defaults.direction, Validators.required],
    quantityMode: [defaults.quantityMode, Validators.required],
    quantity: [defaults.quantity, [Validators.required, integerValidator()]],
    deliveryUnit: [defaults.deliveryUnit, Validators.required],
    quality: [defaults.quality, Validators.required],
    tolerance: [defaults.tolerance, Validators.required],
    toleranceOption: [defaults.toleranceOption, Validators.required],
    incoterm: [defaults.incoterm, Validators.required],
    incotermLocations: [defaults.incotermLocations, minArrayLength(1)],
    index: [defaults.index, Validators.required],
    price: [defaults.price, [Validators.required, twoDecimalPlacesValidator()]],
    premiumCurrency: [defaults.premiumCurrency, Validators.required],
    paymentType: [defaults.paymentType, Validators.required],
    paymentDays: [defaults.paymentDays, [Validators.required, integerValidator()]],
    paymentTrigger: [defaults.paymentTrigger, Validators.required],
    modeOfTransport: [defaults.modeOfTransport, Validators.required],
    broker: [defaults.broker],
    specs: [defaults.specs, Validators.maxLength(250)],
    comment: [defaults.comment, Validators.maxLength(250)],
  });
}

export function tradeDateMax(): string {
  return todayInputValue();
}
