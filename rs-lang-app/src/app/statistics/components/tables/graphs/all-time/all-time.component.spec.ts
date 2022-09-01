import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTimeComponent } from './all-time.component';

describe('AllTimeComponent', () => {
  let component: AllTimeComponent;
  let fixture: ComponentFixture<AllTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
