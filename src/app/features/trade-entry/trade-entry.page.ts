import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MonthlyCommitment, TradeFormValue } from '../../core/models/trade.models';
import { coerceDateInput } from '../../shared/utils/date.utils';
import { AirtableService } from '../../core/services/airtable.service';
import { TradeCalculationService } from '../../core/services/trade-calculation.service';
import { MonthlyCommitmentsTableComponent } from './components/monthly-commitments-table/monthly-commitments-table.component';
import { TradeFormComponent } from './components/trade-form/trade-form.component';
import { buildTradeForm } from './trade-form.builder';

@Component({
  selector: 'app-trade-entry-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TradeFormComponent,
    MonthlyCommitmentsTableComponent,
  ],
  templateUrl: './trade-entry.page.html',
})
export class TradeEntryPage implements OnInit {
  readonly form: FormGroup;
  readonly monthlyCommitments = signal<MonthlyCommitment[]>([]);
  readonly suggestedMonthCount = signal(0);
  readonly submitMessage = signal('');
  monthCountOverride: number | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly calculationService: TradeCalculationService,
    private readonly airtableService: AirtableService
  ) {
    this.form = buildTradeForm(this.fb);
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.updateSuggestedMonths();
      this.syncCommitments();
    });
  }

  get effectiveMonthCount(): number {
    return this.monthCountOverride ?? this.suggestedMonthCount();
  }

  updateSuggestedMonths(): void {
    const start = coerceDateInput(this.form.get('tenorStart')?.value);
    const end = coerceDateInput(this.form.get('tenorEnd')?.value);
    this.suggestedMonthCount.set(this.calculationService.countCalendarMonths(start, end));
  }

  getTradeValue(): TradeFormValue {
    const raw = this.form.getRawValue() as TradeFormValue;
    return {
      ...raw,
      tradeDate: coerceDateInput(raw.tradeDate),
      tenorStart: coerceDateInput(raw.tenorStart),
      tenorEnd: coerceDateInput(raw.tenorEnd),
    };
  }

  onMonthCountOverrideChange(value: string): void {
    this.monthCountOverride = value ? +value : null;
    this.syncCommitments();
  }

  private syncCommitments(): void {
    if (!this.canGenerate()) {
      return;
    }

    const trade = this.getTradeValue();
    const commitments = this.calculationService.generateMonthlyCommitments(
      trade,
      this.effectiveMonthCount
    );
    this.monthlyCommitments.set(commitments);
    this.submitMessage.set('');
  }

  onCommitmentsChange(commitments: MonthlyCommitment[]): void {
    this.monthlyCommitments.set(commitments);
  }

  submitToAirtable(): void {
    if (this.form.invalid || this.monthlyCommitments().length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const trade = this.getTradeValue();
    this.airtableService.submitTrade(trade, this.monthlyCommitments()).subscribe((result) => {
      this.submitMessage.set(result.message);
    });
  }

  canGenerate(): boolean {
    return this.form.valid && this.effectiveMonthCount > 0;
  }

  canSubmit(): boolean {
    return this.form.valid && this.monthlyCommitments().length > 0;
  }
}
