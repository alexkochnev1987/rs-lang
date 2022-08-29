import { TestBed } from '@angular/core/testing';

import { LoadWordsService } from './load-words.service';

describe('LoadWordsService', () => {
  let service: LoadWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
