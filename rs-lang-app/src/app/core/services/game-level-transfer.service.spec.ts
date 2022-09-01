import { TestBed } from '@angular/core/testing';

import { GameLevelTransferService } from './game-level-transfer.service';

describe('GameLevelTransferService', () => {
  let service: GameLevelTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameLevelTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
