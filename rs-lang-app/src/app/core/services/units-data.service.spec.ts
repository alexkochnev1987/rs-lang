import { TestBed } from '@angular/core/testing';

import { UnitsDataService } from './units-data.service';

describe('UnitsDataService', () => {
  let service: UnitsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
