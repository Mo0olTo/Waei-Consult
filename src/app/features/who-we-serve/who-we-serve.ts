import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { WaeiLogo } from '../../shared/ui/waei-logo/waei-logo';
import { TARGET_CLIENT_SEGMENTS } from './data/who-we-serve.data';

@Component({
  selector: 'app-who-we-serve',
  imports: [RouterLink, WaeiLogo],
  templateUrl: './who-we-serve.html',
  styleUrl: './who-we-serve.scss',
})
export class WhoWeServe {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly segments = TARGET_CLIENT_SEGMENTS;

  constructor() {
    afterNextRender(() => {
      this.setupSegmentReveal();
    });
  }

  private setupSegmentReveal(): void {
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

    const segments = root.querySelectorAll('[data-client-segment]');
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

    for (const segment of segments) {
      const rect = segment.getBoundingClientRect();
      const isInView = rect.top < viewportBottom && rect.bottom > 0;

      if (isInView) {
        segment.classList.add('is-visible');
      } else {
        observer.observe(segment);
      }
    }

    root.classList.add('who-we-serve-ready');
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
