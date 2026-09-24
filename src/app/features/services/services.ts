import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface WaeiService {
  title: string;
  capabilities: string[];
}

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly services: WaeiService[] = [
    {
      title: 'الاستشارات وتطوير الأعمال',
      capabilities: [
        'تحليل دقيق للوضع الراهن وتحديد فرص النمو',
        'وضع خطط استراتيجية وتشغيلية قابلة للتنفيذ',
        'إعداد دراسات الجدوى وتقييم المشروعات',
        'تقييم الشركات ورفع القيمة السوقية',
        'إدارة المشروعات لضمان تحقيق الأهداف وزيادة الربحية',
      ],
    },
    {
      title: 'الحوكمة والتدقيق الداخلي',
      capabilities: [
        'بناء هيكل حوكمة واضح وسياسات وإجراءات',
        'خطط عملية لفصل الملكية عن الإدارة',
        'مراجعة تطبيق الضوابط المالية والإدارية',
        'تقييم المخاطر التشغيلية والمالية',
        'ضمان الشفافية والكفاءة والالتزام',
      ],
    },
    {
      title: 'دعم اتخاذ القرار المبني على البيانات',
      capabilities: [
        'تحويل بياناتك إلى رؤى قابلة للتنفيذ',
        'تصميم لوحات مؤشرات الأداء KPIs',
        'إعداد نماذج التقارير الإدارية والمالية',
        'دعم قرارات سريعة ودقيقة مبنية على تحليل',
      ],
    },
    {
      title: 'الامتثال والدعم القانوني',
      capabilities: [
        'ضمان التزام المؤسسة بالقوانين واللوائح',
        'دعم إجراءات التأسيس واستخراج التراخيص',
        'متابعة الالتزامات الضريبية وقوانين العمل',
        'صياغة ومراجعة العقود والاتفاقيات',
      ],
    },
    {
      title: 'تطوير رأس المال البشري والهيكلة',
      capabilities: [
        'إعادة تصميم الهيكل التنظيمي وتوصيف الوظائف',
        'تقييم الاحتياجات التدريبية وبناء خطط التطوير',
        'رفع كفاءة الفريق وضمان استدامة الأداء',
        'بناء ثقافة مؤسسية تدعم النمو',
      ],
    },
    {
      title: 'إدارة المخاطر والأزمات واستمرارية الأعمال',
      capabilities: [
        'تحديد وتقييم المخاطر قبل حدوثها',
        'وضع خطط المواجهة والاستجابة',
        'إدارة الأزمات بفعالية',
        'بناء خطط استمرارية الأعمال BCP',
      ],
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
