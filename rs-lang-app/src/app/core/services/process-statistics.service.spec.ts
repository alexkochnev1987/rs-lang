import { TestBed } from '@angular/core/testing';

import { ProcessStatisticsService } from './process-statistics.service';

describe('ProcessStatisticsService', () => {
  let service: ProcessStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcessStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
