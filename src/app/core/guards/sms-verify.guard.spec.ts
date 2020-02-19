import { TestBed, async, inject } from '@angular/core/testing';

import { SmsVerifyGuard } from './sms-verify.guard';

describe('SmsVerifyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmsVerifyGuard]
    });
  });

  it('should ...', inject([SmsVerifyGuard], (guard: SmsVerifyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
