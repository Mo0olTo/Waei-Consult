import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CarouselComponent, CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CAROUSEL_HOME_IMAGE, CAROUSEL_HOME_SLIDES } from '../../data/carousel-home.data';

@Component({
  selector: 'app-carousel-home',
  imports: [CarouselModule],
  templateUrl: './carousel-home.html',
  styleUrl: './carousel-home.scss',
  // The library renders its own DOM, so emulated encapsulation cannot style it.
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselHome {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);
  private readonly carousel = viewChild(CarouselComponent);

  protected readonly slides = CAROUSEL_HOME_SLIDES;
  protected readonly imageSize = CAROUSEL_HOME_IMAGE;
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
    root.querySelector('.owl-carousel')?.setAttribute('aria-label', 'شرائح من خدمات واعي');
    root.querySelector('.owl-prev')?.setAttribute('aria-label', 'الشريحة السابقة');
    root.querySelector('.owl-next')?.setAttribute('aria-label', 'الشريحة التالية');
    root.querySelector('.owl-dots')?.setAttribute('aria-label', 'التنقل بين الشرائح');

    root.querySelectorAll('.owl-dot').forEach((dot, index) => {
      dot.setAttribute('aria-label', `الانتقال إلى الشريحة ${index + 1}`);
    });

    root.querySelectorAll('.owl-item[role="group"]').forEach((item) => {
      const match = /(\d+) of (\d+)/.exec(item.getAttribute('aria-label') ?? '');
      if (match) {
        item.setAttribute('aria-label', `الشريحة ${match[1]} من ${match[2]}`);
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
      margin: 0,
      autoplay: !reduceMotion,
      autoplayTimeout: 6000,
      autoplayHoverPause: true,
      autoplaySpeed: 800,
      smartSpeed: 800,
      animateOut: reduceMotion ? false : 'fadeOut',
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      nav: true,
      // Icons are drawn in CSS. Text arrows are missing from the Arabic fonts and sit off-center on phones.
      navText: ['', ''],
      dots: true,
    };
  }
}
