import { TestBed } from '@angular/core/testing';

import { LoginIdService } from './login-id.service';

describe('LoginIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginIdService = TestBed.get(LoginIdService);
    expect(service).toBeTruthy();
  });
});
