import { TestBed } from '@angular/core/testing';

import { ShowRegistrationService } from './show-registration.service';

describe('ShowRegistrationService', () => {
  let service: ShowRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
