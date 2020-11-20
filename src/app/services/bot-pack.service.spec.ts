import { TestBed } from '@angular/core/testing';

import { BotPackService } from './bot-pack.service';

describe('BotPackService', () => {
  let service: BotPackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotPackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
