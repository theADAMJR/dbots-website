import { TestBed } from '@angular/core/testing';

import { BotTokenService } from './bot-token.service';

describe('BotTokenService', () => {
  let service: BotTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
