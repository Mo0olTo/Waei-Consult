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
    lines: [ 'وتطوير الأعمال' ,'الاستشارات'],
    brief:
      'تحليل دقيق للوضع الراهن وتحديد فرص النمو، ووضع خطط استراتيجية وتشغيلية قابلة للتنفيذ.',
  },
  {
    serviceId: 'data-driven-decisions',
    lines: [ 'المبني على البيانات','دعم اتخاذ القرار'],
    brief:
      'تحويل بياناتك إلى رؤى قابلة للتنفيذ، ودعم قرارات سريعة ودقيقة مبنية على التحليل.',
  },
  {
    serviceId: 'governance',
    lines: [ 'والتدقيق الداخلي', 'الحوكمة'],
    brief:
      'بناء هيكل حوكمة واضح وسياسات وإجراءات، وخطط عملية لفصل الملكية عن الإدارة.',
  },
  {
    serviceId: 'compliance',
    lines: [ 'والدعم القانوني','الامتثال'],
    brief:
      'تجهيز المؤسسة للالتزام بالقوانين واللوائح، ودعم إجراءات التأسيس واستخراج التراخيص.',
  },
  {
    serviceId: 'human-capital',
    lines: [ 'البشري والهيكلة','تطوير رأس المال'],
    brief:
      'إعادة تصميم الهيكل التنظيمي وتوصيف الوظائف، وبناء ثقافة مؤسسية تدعم النمو.',
  },
  {
    serviceId: 'business-continuity',
    lines: [ 'واستمرارية الأعمال','المخاطر والأزمات'],
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
