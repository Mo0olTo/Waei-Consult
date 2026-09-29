import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { WaeiLogo } from './waei-logo';

describe('WaeiLogo', () => {
  let component: WaeiLogo;
  let fixture: ComponentFixture<WaeiLogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaeiLogo],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(WaeiLogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand wordmark in the heading font', () => {
    const wordmark: HTMLAnchorElement = fixture.nativeElement.querySelector('a');

    expect(wordmark.textContent?.trim()).toBe('واعي');
    expect(wordmark.classList.contains('font-heading')).toBe(true);
    expect(wordmark.classList.contains('text-3xl')).toBe(true);
    expect(wordmark.getAttribute('href')).toBe('/');
  });

  it('should apply the size and link inputs', () => {
    fixture.componentRef.setInput('size', 'sm');
    fixture.componentRef.setInput('link', '/about');
    fixture.detectChanges();

    const wordmark: HTMLAnchorElement = fixture.nativeElement.querySelector('a');

    expect(wordmark.classList.contains('text-2xl')).toBe(true);
    expect(wordmark.getAttribute('href')).toBe('/about');
  });
});
