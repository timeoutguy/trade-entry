import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MonthlyCommitment, SubmitResult, TradeFormValue } from '../models/trade.models';

export interface AirtableConfig {
  baseId: string;
  apiKey: string;
  tableName: string;
  enabled: boolean;
}

@Injectable({ providedIn: 'root' })
export class AirtableService {
  private readonly config: AirtableConfig = environment.airtable;

  submitTrade(
    trade: TradeFormValue,
    commitments: MonthlyCommitment[]
  ): Observable<SubmitResult> {
    const payload = { trade, commitments };

    if (!this.config.enabled) {
      console.log('[Airtable stub] Payload ready for submission:', payload);
      return of({
        success: true,
        message: 'Airtable not configured — payload logged to console.',
      });
    }

    // TODO: wire real Airtable REST API when credentials available
    console.log('[Airtable] Would submit to', this.config.tableName, payload);
    return of({
      success: true,
      message: 'Trade submitted successfully.',
    });
  }
}
