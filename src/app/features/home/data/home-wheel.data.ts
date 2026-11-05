import { WheelSegment } from '../../../shared/Components/rotating-wheel/rotating-wheel';
import { findService } from '../../services/data/services.data';

export interface HomeWheelItem extends WheelSegment {
  title: string;
  brief: string;
  link: string;
}

interface HomeWheelEntry {
  serviceId: string;
  lines: readonly [string, string];
  brief: string;
}

// Briefs combine bullet points from the official services list in docs/content.md.
const HOME_WHEEL_ENTRIES: readonly HomeWheelEntry[] = [
  {
    serviceId: 'business-consulting',
    lines: ['الاستشارات', 'وتطوير الأعمال'],
    brief:
      'نبدأ معك من بداية التأسيس بخبرة اقتصادية وقانونية، ونستمر معك بتخطيط سليم يساعدك على التشغيل والنمو والاستدامة؛ فنحن شركاؤك وليس فقط مستشاروك.',
  },
  {
    serviceId: 'data-driven-decisions',
    lines: ['دعم اتخاذ القرار', 'المبني على البيانات'],
    brief:
      'نستقبل بياناتك، ونقوم بتحليلها وإعادة تبويبها، ثم نعيدها إليك في صورة تقارير وتوصيات واضحة ودقيقة تمهد لك طريق القرار السليم في الوقت المناسب.',
  },
  {
    serviceId: 'governance',
    lines: ['الحوكمة', 'والتدقيق الداخلي'],
    brief:
      'فصل المال عن الإدارة، والتنظيم الداخلي وتوزيع الأدوار والمهام بوضوح، ووضع نظام تقارير شفاف ومعايير رقابية واضحة، مع تحليل دقيق للمخاطر؛ مما يحمي استثماراتك من الخسائر والمخالفات القانونية.',
  },
  {
    serviceId: 'compliance',
    lines: ['الامتثال', 'والدعم القانوني'],
    brief:
      'نراجع قوانين دولة الاستثمار، ثم نوضح لك الشكل القانوني الأمثل لاستثماراتك عند التأسيس، ونساعدك في استخراج التراخيص والأوراق القانونية، مع وضع لوائح داخلية دقيقة، وصياغة العقود والاتفاقيات.',
  },
  {
    serviceId: 'human-capital',
    lines: ['تطوير رأس المال', 'البشري والهيكلة'],
    brief:
      'تطوير فريق العمل الحالي بخطط تدريبية وُضعت بعد تقييم الفريق، ومراجعة الوصف الوظيفي وتعديله، بالإضافة إلى تصميم نظام متابعة وتحفيز مناسب يضمن بيئة عمل جاذبة للكفاءات وداعمة للنمو.',
  },
  {
    serviceId: 'business-continuity',
    lines: ['المخاطر والأزمات', 'واستمرارية الأعمال'],
    brief:
      'في ظل مخاطر وتحديات بيئة العمل المحلية والعالمية، نقوم بمسح شامل للمخاطر التي قد تواجه استثماراتك، ونضع خطط المواجهة والاستجابة والطوارئ، بالإضافة إلى إدارة الأزمة عند حدوثها.',
  },
];

export const HOME_WHEEL_ITEMS: readonly HomeWheelItem[] = HOME_WHEEL_ENTRIES.map((entry) => {
  const service = findService(entry.serviceId);
  if (!service) {
    throw new Error(`Unknown service id in home wheel data: ${entry.serviceId}`);
  }

  return {
    id: service.id,
    lines: entry.lines,
    title: service.title,
    brief: entry.brief,
    link: `/services/${service.id}`,
  };
});
