import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChallengeStatisticsComponent } from './audio-challenge-statistics.component';

describe('AudioChallengeStatisticsComponent', () => {
  let component: AudioChallengeStatisticsComponent;
  let fixture: ComponentFixture<AudioChallengeStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioChallengeStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioChallengeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
