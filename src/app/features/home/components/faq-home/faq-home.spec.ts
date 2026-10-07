import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqHome } from './faq-home';

describe('FaqHome', () => {
  let fixture: ComponentFixture<FaqHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqHome],
    }).compileComponents();

    fixture = TestBed.createComponent(FaqHome);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render every question closed', () => {
    const buttons = buttonsIn(fixture);
    expect(buttons).toHaveLength(10);
    expect(buttons.every((button) => button.getAttribute('aria-expanded') === 'false')).toBe(true);
    expect(buttons[0].textContent).toContain('كم تكلفة دراسة الجدوى؟');
  });

  it('should keep only one item open', () => {
    const buttons = buttonsIn(fixture);

    buttons[0].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');

    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[0].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');

    buttons[1].click();
    fixture.detectChanges();
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
  });

  it('should render answer lists and bold consultation labels', () => {
    const root = fixture.nativeElement as HTMLElement;
    // Card list, study contents, pricing factors, and the consultation rows.
    expect(root.querySelectorAll('ul')).toHaveLength(4);
    expect(root.querySelector('ol')?.querySelectorAll('li')).toHaveLength(6);

    const labels = [...root.querySelectorAll('strong')].map((node) => node.textContent);
    expect(labels).toEqual(['الحجز:', 'القيمة:', 'المدة:', 'الإجراء:']);
    expect(root.textContent).toContain('[المبلغ]');
    expect(root.textContent).toContain('جنيه مصري');
  });

  it('should publish FAQPage JSON-LD from the same questions', () => {
    const script = document.getElementById('faq-home-jsonld');
    expect(script?.getAttribute('type')).toBe('application/ld+json');

    const schema = JSON.parse(script?.textContent ?? '{}') as {
      '@type': string;
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(10);
    expect(schema.mainEntity[0].name).toBe('كم تكلفة دراسة الجدوى؟');
    expect(schema.mainEntity[0].acceptedAnswer.text).toContain('[المبلغ] جنيه مصري');
  });

  it('should remove the JSON-LD script when the section is destroyed', () => {
    expect(document.getElementById('faq-home-jsonld')).not.toBeNull();
    fixture.destroy();
    expect(document.getElementById('faq-home-jsonld')).toBeNull();
  });
});

function buttonsIn(fixture: ComponentFixture<FaqHome>): HTMLButtonElement[] {
  return [...(fixture.nativeElement as HTMLElement).querySelectorAll('button')];
}
