import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { WhoWeServe } from './who-we-serve';

describe('WhoWeServe', () => {
  let component: WhoWeServe;
  let fixture: ComponentFixture<WhoWeServe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoWeServe],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WhoWeServe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
