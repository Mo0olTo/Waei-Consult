import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { WhyWaei } from './why-waei';

describe('WhyWaei', () => {
  let component: WhyWaei;
  let fixture: ComponentFixture<WhyWaei>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyWaei],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WhyWaei);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
