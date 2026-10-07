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
      'تحليل دقيق للوضع الراهن وتحديد فرص النمو، ووضع خطط استراتيجية وتشغيلية قابلة للتنفيذ.',
  },
  {
    serviceId: 'data-driven-decisions',
    lines: ['دعم اتخاذ القرار', 'المبني على البيانات'],
    brief:
      'تحويل بياناتك إلى رؤى قابلة للتنفيذ، ودعم قرارات سريعة ودقيقة مبنية على التحليل.',
  },
  {
    serviceId: 'governance',
    lines: ['الحوكمة', 'والتدقيق الداخلي'],
    brief:
      'بناء هيكل حوكمة واضح وسياسات وإجراءات، وخطط عملية لفصل الملكية عن الإدارة.',
  },
  {
    serviceId: 'compliance',
    lines: ['الامتثال', 'والدعم القانوني'],
    brief:
      'تجهيز المؤسسة للالتزام بالقوانين واللوائح، ودعم إجراءات التأسيس واستخراج التراخيص.',
  },
  {
    serviceId: 'human-capital',
    lines: ['تطوير رأس المال', 'البشري والهيكلة'],
    brief:
      'إعادة تصميم الهيكل التنظيمي وتوصيف الوظائف، وبناء ثقافة مؤسسية تدعم النمو.',
  },
  {
    serviceId: 'business-continuity',
    lines: ['المخاطر والأزمات', 'واستمرارية الأعمال'],
    brief:
      'تحديد وتقييم المخاطر قبل حدوثها، وبناء خطط استمرارية الأعمال BCP.',
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
