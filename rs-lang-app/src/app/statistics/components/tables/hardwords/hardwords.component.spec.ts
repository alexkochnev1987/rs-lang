import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwordsComponent } from './hardwords.component';

describe('HardwordsComponent', () => {
  let component: HardwordsComponent;
  let fixture: ComponentFixture<HardwordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HardwordsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HardwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
