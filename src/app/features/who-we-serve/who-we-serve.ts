import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface TargetClient {
  title: string;
  description: string;
}

@Component({
  selector: 'app-who-we-serve',
  imports: [RouterLink],
  templateUrl: './who-we-serve.html',
  styleUrl: './who-we-serve.scss',
})
export class WhoWeServe {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly clients: TargetClient[] = [
    {
      title: 'الشركات الناشئة والـ SMEs',
      description: 'اللي عايزة تأسيس صح وهيكلة من اليوم الأول.',
    },
    {
      title: 'الشركات العائلية',
      description: 'اللي بتبحث عن حوكمة وفصل الملكية عن الإدارة واستمرارية.',
    },
    {
      title: 'المؤسسات متوسطة وكبيرة الحجم',
      description: 'اللي محتاجة إعادة هيكلة وتحول رقمي وإدارة مخاطر.',
    },
    {
      title: 'مجالس الإدارات والمديرون التنفيذيون',
      description: 'اللي محتاجين دعم قرار سريع مبني على بيانات موثوقة.',
    },
  ];

  constructor() {
    afterNextRender(() => {
      this.setupCardReveal();
    });
  }

  private setupCardReveal(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const root = this.host.nativeElement as HTMLElement;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const cards = root.querySelectorAll('[data-client-card]');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    );

    const viewportBottom = window.innerHeight * 0.92;

    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const isInView = rect.top < viewportBottom && rect.bottom > 0;

      if (isInView) {
        card.classList.add('is-visible');
      } else {
        observer.observe(card);
      }
    }

    root.classList.add('who-we-serve-ready');
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
