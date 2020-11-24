import { TestBed } from '@angular/core/testing';

import { PackService } from './pack.service';

describe('PackService', () => {
  let service: PackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
