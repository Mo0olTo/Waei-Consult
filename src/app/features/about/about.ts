import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface SupportArea {
  title: string;
  image: string;
}

interface CompanyValue {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly supportAreas: SupportArea[] = [
    { title: 'الاستشارات', image: '/images/sectionsBackground/services.webp' },
    { title: 'الحوكمة', image: '/images/whoWeServe/whoServe.webp' },
    { title: 'دعم اتخاذ القرار', image: '/images/whyWaei/Success.jpg' },
  ];

  protected readonly values: CompanyValue[] = [
    {
      title: 'النزاهة',
      description:
        'نلتزم بأعلى معايير الشفافية والأمانة في تقديم المشورة. رأينا مهني ومحايد ولا يتأثر بأي مصلحة أخرى غير مصلحة العميل.',
    },
    {
      title: 'الدقة',
      description:
        'نبني توصياتنا على تحليل بيانات دقيق وأدلة واضحة. لا مكان للتقديرات العشوائية في قراراتك.',
    },
    {
      title: 'السرية',
      description: 'نحترم خصوصية معلوماتك ونضمن حمايتها. ما يدور داخل مؤسستك يبقى داخلها.',
    },
    {
      title: 'الأمان',
      description:
        'نوفر بيئة آمنة لاتخاذ القرارات. نحمي أصولك وبياناتك وسمعتك من خلال تقييم المخاطر ووضع خطط استباقية.',
    },
    {
      title: 'الشراكة',
      description:
        'يدا بيد لتحقيق الأهداف. نحن لا نقدم تقارير ونرحل. نحن شريكك في النجاح. نعمل معك.',
    },
    {
      title: 'الالتزام بالوقت',
      description:
        'نؤمن أن القرار الصحيح في الوقت الخطأ = قرار خاطئ. نلتزم بالمواعيد ونسلمك الحلول في الوقت المناسب.',
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

    const cards = root.querySelectorAll('[data-about-card]');
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

    root.classList.add('about-ready');
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
