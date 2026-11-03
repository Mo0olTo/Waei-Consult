import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDiagnosis } from './free-diagnosis';

describe('FreeDiagnosis', () => {
  let component: FreeDiagnosis;
  let fixture: ComponentFixture<FreeDiagnosis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeDiagnosis],
    }).compileComponents();

    fixture = TestBed.createComponent(FreeDiagnosis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
