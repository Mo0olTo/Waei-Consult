import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CarouselHome } from './carousel-home';

describe('CarouselHome', () => {
  let component: CarouselHome;
  let fixture: ComponentFixture<CarouselHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselHome],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
