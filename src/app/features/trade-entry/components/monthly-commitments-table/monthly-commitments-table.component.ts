import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  DELIVERY_UNITS,
  DIRECTIONS,
  MODES_OF_TRANSPORT,
  MonthlyCommitment,
  PREMIUM_CURRENCIES,
  TOLERANCE_OPTIONS,
  TRADERS,
  TRADE_LOCATIONS,
  TradeFormValue,
} from '../../../../core/models/trade.models';
import { TradeConfigService } from '../../../../core/services/trade-config.service';
import { TradeCalculationService } from '../../../../core/services/trade-calculation.service';
import { coerceDateInput, formatMonthLabel, parseDateInput } from '../../../../shared/utils/date.utils';

const DATE_FIELDS = new Set<keyof MonthlyCommitment>([
  'tradeDate',
  'tenorStart',
  'tenorEnd',
  'commitmentMonth',
]);

@Component({
  selector: 'app-monthly-commitments-table',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  templateUrl: './monthly-commitments-table.component.html',
})
export class MonthlyCommitmentsTableComponent {
  @Input({ required: true }) commitments: MonthlyCommitment[] = [];
  @Input({ required: true }) parentTrade!: TradeFormValue;
  @Output() commitmentsChange = new EventEmitter<MonthlyCommitment[]>();

  readonly traders = TRADERS;
  readonly tradeLocations = TRADE_LOCATIONS;
  readonly directions = DIRECTIONS;
  readonly deliveryUnits = DELIVERY_UNITS;
  readonly toleranceOptions = TOLERANCE_OPTIONS;
  readonly premiumCurrencies = PREMIUM_CURRENCIES;
  readonly modesOfTransport = MODES_OF_TRANSPORT;

  constructor(
    public readonly config: TradeConfigService,
    private readonly calculationService: TradeCalculationService
  ) {}

  monthLabel(commitment: MonthlyCommitment): string {
    const date = parseDateInput(commitment.commitmentMonth);
    return date ? formatMonthLabel(date) : commitment.commitmentMonth;
  }

  updateField<K extends keyof MonthlyCommitment>(
    index: number,
    field: K,
    value: MonthlyCommitment[K]
  ): void {
    const normalized = (
      DATE_FIELDS.has(field)
        ? coerceDateInput(value as string | Date)
        : value
    ) as MonthlyCommitment[K];

    const next = this.commitments.map((row, rowIndex) => {
      if (rowIndex !== index) {
        return row;
      }
      const updated = { ...row, [field]: normalized };
      if (field === 'contractRef' || field === 'tradeLocation') {
        const monthDate = parseDateInput(updated.commitmentMonth);
        if (monthDate) {
          updated.legNumber = this.calculationService.generateLegNumber(
            updated.contractRef,
            monthDate,
            updated.tradeLocation
          );
        }
      }
      return updated;
    });
    this.commitmentsChange.emit(next);
  }

  resetRow(index: number): void {
    const regenerated = this.calculationService.generateMonthlyCommitments(
      this.parentTrade,
      this.commitments.length
    );
    const next = this.commitments.map((row, rowIndex) =>
      rowIndex === index ? regenerated[index] : row
    );
    this.commitmentsChange.emit(next);
  }
}
