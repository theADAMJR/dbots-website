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

  it('user does not own bot, returns false', () => {
    const result = guard.canActivate({
      paramMap: new Map().set('id', '525935335918665761')
    } as any);

    expect(result).toBeFalse();
  });

  it('user owns bot, returns true', () => {
    const result = guard.canActivate({
      paramMap: new Map().set('id', '525935335918665760')
    } as any);

    expect(result).toBeTrue();
  });
});
