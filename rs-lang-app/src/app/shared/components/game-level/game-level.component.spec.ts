import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLevelComponent } from './game-level.component';

describe('GameLevelComponent', () => {
  let component: GameLevelComponent;
  let fixture: ComponentFixture<GameLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameLevelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
