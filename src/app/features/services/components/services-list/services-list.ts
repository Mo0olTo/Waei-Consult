import { afterNextRender, Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CtaCard, CtaSection } from '../../../../shared/Components/cta-section/cta-section';
import { SERVICES } from '../../data/services.data';
import { ServiceIcon } from '../service-icon/service-icon';
import { WaeiLogo } from '../../../../shared/ui/waei-logo/waei-logo';

@Component({
  selector: 'app-services-list',
  imports: [RouterLink, ServiceIcon, CtaSection, WaeiLogo],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class ServicesList {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly services = SERVICES;

  protected readonly resourceLinks: readonly CtaCard[] = [
    { title: 'رؤى', icon: 'insights', link: '/contact', value: 63 },
    { title: 'مشاريع', icon: 'projects', link: '/contact', value: 18 },
    { title: 'أبحاث', icon: 'research', link: '/contact', value: 12 },
    { title: 'شركات استشارية', icon: 'firms', link: '/contact', value: 8 },
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const cards = root.querySelectorAll('[data-service-card]');
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

    root.classList.add('services-ready');
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
