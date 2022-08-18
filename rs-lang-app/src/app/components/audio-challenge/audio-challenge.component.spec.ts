import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioChallengeComponent } from './audio-challenge.component';

describe('AudioChallengeComponent', () => {
  let component: AudioChallengeComponent;
  let fixture: ComponentFixture<AudioChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
