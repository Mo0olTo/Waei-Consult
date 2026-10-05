import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsHome } from './testimonials-home';

describe('TestimonialsHome', () => {
  let component: TestimonialsHome;
  let fixture: ComponentFixture<TestimonialsHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialsHome],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialsHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the section heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('آراء العملاء');
  });
});
