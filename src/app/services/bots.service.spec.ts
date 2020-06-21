import { TestBed } from '@angular/core/testing';

import { BotsService } from './bots.service';

describe('BotsService', () => {
  let service: BotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
