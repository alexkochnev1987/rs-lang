import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorRegistrationComponent } from './error-registration.component';

describe('ErrorRegistrationComponent', () => {
  let component: ErrorRegistrationComponent;
  let fixture: ComponentFixture<ErrorRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
