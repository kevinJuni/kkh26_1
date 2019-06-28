import { TestBed } from '@angular/core/testing';

import { MemberIdService } from './member-id.service';

describe('MemberIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberIdService = TestBed.get(MemberIdService);
    expect(service).toBeTruthy();
  });
});
