export interface CarouselHomeSlide {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export const CAROUSEL_HOME_IMAGE = { width: 1536, height: 1024 } as const;

// Captions reuse wording from docs/content.md (services, values and mission).
export const CAROUSEL_HOME_SLIDES: readonly CarouselHomeSlide[] = [
  {
    id: 1,
    src: '/images/carouselHome/1.webp',
    alt: 'عدسة مكبرة فوق رسوم بيانية مالية على مكتب أمام أفق المدينة وقت الغروب',
    title: 'دعم اتخاذ القرار المبني على البيانات',
    description: 'تحويل البيانات إلى رؤى قابلة للتنفيذ.',
  },
  {
    id: 2,
    src: '/images/carouselHome/2.webp',
    alt: 'درع ذهبي عليه قفل على مكتب يرمز إلى حماية المعلومات الحساسة',
    title: 'السرية والأمان',
    description: 'قيمتان أساسيتان في عملنا مع كل عميل.',
  },
  {
    id: 3,
    src: '/images/carouselHome/3.webp',
    alt: 'ساعة رملية وساعة وكتب استراتيجية على مكتب مدير مع تقويم يُحدَّد فيه موعد',
    title: 'القرار الصحيح في الوقت المناسب',
    description: 'نمكّن المديرين والمؤسسات من اتخاذ القرارات الصحيحة في الوقت المناسب.',
  },
  {
    id: 4,
    src: '/images/carouselHome/4.webp',
    alt: 'ستة قطاعات متخصصة: الصحة والمقاولات والسياحة والزراعة والنقل البحري والصناعة والطاقة',
    title: 'القطاعات التخصصية',
    description: 'حلول استشارية مصممة وفق قطاعك ولوائحه وتحدياته التشغيلية.',
  },
];
