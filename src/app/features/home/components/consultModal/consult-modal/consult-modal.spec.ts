import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultModal } from './consult-modal';

describe('ConsultModal', () => {
  let component: ConsultModal;
  let fixture: ComponentFixture<ConsultModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
