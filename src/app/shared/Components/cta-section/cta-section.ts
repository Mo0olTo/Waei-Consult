import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

export type CtaIconName = 'insights' | 'projects' | 'research' | 'firms';

export interface CtaCard {
  title: string;
  icon: CtaIconName;
  link: string;
  value: number;
}

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly cards = input.required<readonly CtaCard[]>();

  private readonly displayedValues = signal<readonly number[]>([]);
  private frameId = 0;

  constructor() {
    afterNextRender(() => {
      this.startWhenVisible();
    });
  }

  protected displayValue(index: number): string {
    const current = this.displayedValues()[index] ?? 0;
    return String(current).padStart(2, '0');
  }

  private startWhenVisible(): void {
    const root = this.host.nativeElement;
    const cards = this.cards();

    const run = (): void => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        this.displayedValues.set(cards.map((card) => card.value));
        return;
      }

      this.animateValues(cards);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }

    const rect = root.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;

    if (isInView) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    this.destroyRef.onDestroy(() => observer.disconnect());
  }

  private animateValues(cards: readonly CtaCard[]): void {
    const duration = 1000;
    const started = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;

      this.displayedValues.set(cards.map((card) => Math.round(card.value * eased)));

      if (progress < 1) {
        this.frameId = requestAnimationFrame(tick);
      }
    };

    this.frameId = requestAnimationFrame(tick);
    this.destroyRef.onDestroy(() => cancelAnimationFrame(this.frameId));
  }
}
