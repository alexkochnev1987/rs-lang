import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsMenuComponent } from './units-menu.component';

describe('UnitsMenuComponent', () => {
  let component: UnitsMenuComponent;
  let fixture: ComponentFixture<UnitsMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnitsMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnitsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
