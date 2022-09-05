import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyWordsComponent } from './easy-words.component';

describe('EasyWordsComponent', () => {
  let component: EasyWordsComponent;
  let fixture: ComponentFixture<EasyWordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyWordsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
