import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AboutStatement } from './models/about-statement.model';
import { CompanyValue } from './models/company-value.model';
import { SupportArea } from './models/support-area.model';

@Component({
  selector: 'app-about',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly supportAreas: SupportArea[] =[
    {
      title: 'الاستشارات',
      image: '/images/aboutSection/idea.webp',
      desc: 'نقدم استشارات متخصصة تساعد المنشآت على فهم تحدياتها وبناء حلول عملية قابلة للتنفيذ.\nندعم عملاءنا بخبرات منهجية تسهم في تطوير الأداء وتحقيق أهدافهم.'
    },
    {
      title: 'الحوكمة',
      image: '/images/aboutSection/direction.webp',
      desc: 'نساعد المنشآت على بناء أطر حوكمة واضحة تعزز الشفافية والمسؤولية وتدعم استدامة الأعمال.\nنصمم ممارسات متوازنة تساهم في وضوح الأدوار ورفع كفاءة اتخاذ القرار.'
    },
    {
      title: 'دعم اتخاذ القرار',
      image: '/images/aboutSection/partnership.webp',
      desc: 'نوفر رؤى وتحليلات تساعد القيادات على اتخاذ قرارات أكثر وضوحًا واستنادًا إلى معلومات موثوقة.\nنحوّل البيانات والمعطيات إلى أدوات عملية تدعم التخطيط وتوجيه الأعمال.'
    }
  ];

  protected readonly statements: AboutStatement[] = [
    {
      title: 'الرؤية',
      description:
        'أن نكون الخيار الاستشاري الأول في مصر والخليج للشركات والأفراد، لدعم اتخاذ القرارات الصحيحة وتحقيق النمو المستدام.',
      icon: 'vision',
    },
    {
      title: 'الرسالة',
      description:
        'تسخير خبراتنا التراكمية العملية والعلمية في صورة استشارات محترفة لتمكين الأفراد والمديرين والمؤسسات من اتخاذ القرارات الصحيحة في الوقت المناسب.',
      icon: 'mission',
    },
    {
      title: 'الهدف',
      description:
        'نقل شركائنا من المديرين وأصحاب الأعمال والمؤسسات من مرحلة رد الفعل إلى مرحلة الاستباق لتحقيق النمو والريادة والاستدامة.',
      icon: 'goal',
    },
  ];

  protected readonly values: CompanyValue[] = [
    {
      title: 'النزاهة',
      description:
        'نلتزم بأعلى معايير الشفافية والأمانة في تقديم المشورة. رأينا مهني ومحايد ولا يتأثر بأي مصلحة أخرى غير مصلحة العميل.',
      icon: 'integrity',
    },
    {
      title: 'الدقة',
      description:
        'نبني توصياتنا على تحليل بيانات دقيق وأدلة واضحة. لا مكان للتقديرات العشوائية في قراراتك.',
      icon: 'accuracy',
    },
    {
      title: 'السرية',
      description: 'نحترم خصوصية معلوماتك ونضمن حمايتها. ما يدور داخل مؤسستك يبقى داخلها.',
      icon: 'confidentiality',
    },
    {
      title: 'الأمان',
      description:
        'نوفر بيئة آمنة لاتخاذ القرارات. نحمي أصولك وبياناتك وسمعتك من خلال تقييم المخاطر ووضع خطط استباقية.',
      icon: 'safety',
    },
    {
      title: 'الشراكة',
      description:
        'يدا بيد لتحقيق الأهداف. نحن لا نقدم تقارير ونرحل. نحن شريكك في النجاح. نعمل معك.',
      icon: 'partnership',
    },
    {
      title: 'الالتزام بالوقت',
      description:
        'نؤمن أن القرار الصحيح في الوقت الخطأ = قرار خاطئ. نلتزم بالمواعيد ونسلمك الحلول في الوقت المناسب.',
      icon: 'time',
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
