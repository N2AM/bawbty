import { TestBed, async, inject } from '@angular/core/testing';

import { QuoteGuard } from './quote.guard';

describe('QuoteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuoteGuard]
    });
  });

  it('should ...', inject([QuoteGuard], (guard: QuoteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
