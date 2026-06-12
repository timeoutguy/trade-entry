import { TestBed } from '@angular/core/testing';
import { createDefaultTradeFormValue } from '../models/trade.models';
import { AirtableService } from './airtable.service';

describe('AirtableService', () => {
  let service: AirtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirtableService);
    spyOn(console, 'log');
  });

  it('logs payload when Airtable is disabled', (done) => {
    const trade = createDefaultTradeFormValue();
    service.submitTrade(trade, []).subscribe((result) => {
      expect(result.success).toBeTrue();
      expect(result.message).toContain('not configured');
      expect(console.log).toHaveBeenCalled();
      done();
    });
  });
});
