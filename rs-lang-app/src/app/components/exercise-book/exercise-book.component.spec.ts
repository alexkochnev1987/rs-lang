import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseBookComponent } from './exercise-book.component';

describe('ExerciseBookComponent', () => {
  let component: ExerciseBookComponent;
  let fixture: ComponentFixture<ExerciseBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExerciseBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExerciseBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
