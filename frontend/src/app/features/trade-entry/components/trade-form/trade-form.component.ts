import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  DELIVERY_UNITS,
  DIRECTIONS,
  MODES_OF_TRANSPORT,
  PREMIUM_CURRENCIES,
  TOLERANCE_OPTIONS,
  TRADERS,
  TRADE_LOCATIONS,
} from '../../../../core/models/trade.models';
import { TradeConfigService } from '../../../../core/services/trade-config.service';
import { coerceDateInput, formatDisplayDate, parseDateInput } from '../../../../shared/utils/date.utils';
import { tradeDateMax } from '../../trade-form.builder';

@Component({
  selector: 'app-trade-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './trade-form.component.html',
})
export class TradeFormComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;

  readonly traders = TRADERS;
  readonly tradeLocations = TRADE_LOCATIONS;
  readonly directions = DIRECTIONS;
  readonly deliveryUnits = DELIVERY_UNITS;
  readonly toleranceOptions = TOLERANCE_OPTIONS;
  readonly premiumCurrencies = PREMIUM_CURRENCIES;
  readonly modesOfTransport = MODES_OF_TRANSPORT;
  readonly tradeDateMax = parseDateInput(tradeDateMax())!;

  constructor(public readonly config: TradeConfigService) {}

  ngOnInit(): void {
    this.form.get('tenorStart')?.valueChanges.subscribe(() => {
      this.form.get('tenorEnd')?.updateValueAndValidity({ emitEvent: false });
    });
  }

  displayDate(field: string): string {
    return formatDisplayDate(coerceDateInput(this.form.get(field)?.value));
  }

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

}
