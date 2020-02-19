import { TestBed, async, inject } from '@angular/core/testing';

import { EmailSentGuard } from './email-sent.guard';

describe('EmailSentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailSentGuard]
    });
  });

  it('should ...', inject([EmailSentGuard], (guard: EmailSentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
