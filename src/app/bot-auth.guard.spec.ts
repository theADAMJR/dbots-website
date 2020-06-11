import { TestBed } from '@angular/core/testing';

import { BotAuthGuard } from './bot-auth.guard';

describe('BotAuthGuard', () => {
  let guard: BotAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BotAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
