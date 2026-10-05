import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TestimonialCard } from '../../../../shared/ui/testimonial-card/testimonial-card';
import { HOME_TESTIMONIALS } from '../../data/testimonials-home.data';

@Component({
  selector: 'app-testimonials-home',
  imports: [CarouselModule, TestimonialCard],
  templateUrl: './testimonials-home.html',
  styleUrl: './testimonials-home.scss',
  // The library renders its own DOM, so emulated encapsulation cannot style it.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsHome {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly carousel = viewChild(CarouselComponent);

  protected readonly testimonials = signal(HOME_TESTIMONIALS);
  protected readonly options = this.createOptions();

  protected pauseAutoplay(): void {
    this.carousel()?.startPausing();
  }

  protected resumeAutoplay(event: FocusEvent): void {
    const section = event.currentTarget as HTMLElement;
    if (!section.contains(event.relatedTarget as Node | null)) {
      this.carousel()?.startPlayML();
    }
  }

  // The library hard-codes English ARIA labels, which are wrong for an Arabic screen reader.
  protected localizeControls(): void {
    const root = this.host.nativeElement;
    root.querySelector('.owl-carousel')?.setAttribute('aria-label', 'آراء عملاء واعي');
    root.querySelector('.owl-prev')?.setAttribute('aria-label', 'الرأي السابق');
    root.querySelector('.owl-next')?.setAttribute('aria-label', 'الرأي التالي');
    root.querySelector('.owl-dots')?.setAttribute('aria-label', 'التنقل بين الآراء');

    root.querySelectorAll('.owl-dot').forEach((dot, index) => {
      dot.setAttribute('aria-label', `الانتقال إلى الرأي ${index + 1}`);
    });

    root.querySelectorAll('.owl-item[role="group"]').forEach((item) => {
      const match = /(\d+) of (\d+)/.exec(item.getAttribute('aria-label') ?? '');
      if (match) {
        item.setAttribute('aria-label', `الرأي ${match[1]} من ${match[2]}`);
      }
    });
  }

  private createOptions(): OwlOptions {
    const reduceMotion =
      this.document.defaultView?.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    return {
      rtl: true,
      loop: true,
      items: 1,
      margin: 24,
      autoplay: !reduceMotion,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
      autoplaySpeed: 1800,
      smartSpeed: 1000,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: false,
      nav: true,
      navText: ['&rarr;', '&larr;'],
      dots: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1024: { items: 3 },
      },
    };
  }
}
