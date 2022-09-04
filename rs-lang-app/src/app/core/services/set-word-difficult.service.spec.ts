import { TestBed } from '@angular/core/testing';

import { SetWordDifficultService } from './set-word-difficult.service';

describe('SetWordDifficultService', () => {
  let service: SetWordDifficultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetWordDifficultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
