import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { AppModule } from '../app.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('is admin, returns true if has admin role', () => {
    const result = service.isAdmin({ roles: ['admin'] });

    expect(result).toBeTrue();
  });
});
