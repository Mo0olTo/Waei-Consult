import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialCard } from './testimonial-card';

describe('TestimonialCard', () => {
  let component: TestimonialCard;
  let fixture: ComponentFixture<TestimonialCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TestimonialCard);
    fixture.componentRef.setInput('name', 'عميل');
    fixture.componentRef.setInput('review', 'نص المراجعة');
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name and review', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('عميل');
    expect(compiled.querySelector('blockquote')?.textContent).toContain('نص المراجعة');
  });
});
