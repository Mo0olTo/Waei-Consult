import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface WhyWaeiReason {
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-waei',
  imports: [RouterLink],
  templateUrl: './why-waei.html',
  styleUrl: './why-waei.scss',
})
export class WhyWaei {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly reasons: WhyWaeiReason[] = [
    {
      title: 'منهجية مبنية على البيانات لا التخمين',
      description:
        'نعتمد على التحليل الدقيق والأرقام ومؤشرات الأداء لكشف حقيقة ما يحدث، وتحديد فرص التحسين، ودعم قراراتكم بما يسهم في زيادة الربحية وتقليل الخسائر.',
    },
    {
      title: 'شريك استراتيجي لا مجرد مستشار عابر',
      description:
        'المستشار التقليدي يقدم لك تقريراً ويرحل. أما «واعي» فشريك استراتيجي يبدأ معك من التأسيس حتى الاستدامة، يفكر معك ويخطط وينفذ بجانبك.',
    },
    {
      title: 'خبرة محلية بمعايير دولية',
      description:
        'نفهم واقع الأسواق في مصر والخليج وتحدياتها التشغيلية والقانونية والضريبية، ونوظف أفضل الممارسات في الحوكمة والإدارة لدعم الامتثال وحماية أعمالكم.',
    },
    {
      title: 'من رد الفعل إلى الاستباق والريادة',
      description:
        'نساعد مؤسستكم على الانتقال من معالجة الأزمات اليومية إلى استباق المخاطر والحد من آثارها، وبناء منظومة قادرة على مواجهة التحديات وتحقيق النمو المستدام.',
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

    const cards = root.querySelectorAll('[data-why-card]');
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

    root.classList.add('why-waei-ready');
    this.destroyRef.onDestroy(() => observer.disconnect());
  }
}
