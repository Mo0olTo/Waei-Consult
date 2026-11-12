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
    src: '/images/carouselHome/3.webp',
    alt: 'ساعة رملية وساعة وكتب استراتيجية على مكتب مدير مع تقويم يُحدَّد فيه موعد',
    title: 'القرار الصحيح في الوقت المناسب',
    description: 'بيت خبرة لدعم الأفراد والشركات على اتخاذ القرار الصحيح في الوقت المناسب، لنختصر عليك شهورًا من التجربة والخطأ.',
  },
  {
    id: 2,
    src: '/images/carouselHome/5.webp',
    alt: 'عدسة مكبرة فوق رسوم بيانية مالية على مكتب أمام أفق المدينة وقت الغروب',
    title: ' أسس مشروعك باحترافية',
    description: 'نراجع قوانين دولتك، ثم نوضح لك الشكل القانوني الأمثل لاستثماراتك عند التأسيس، ونساعدك في استخراج التراخيص والأوراق القانونية.',
  },
  {
    id: 3,
    src: '/images/carouselHome/6.webp',
    alt: 'عدسة مكبرة فوق رسوم بيانية مالية على مكتب أمام أفق المدينة وقت الغروب',
    title: ' من رد الفعل إلى الاستباق',
    description: 'نساعد المؤسسات على الانتقال من معالجة المشكلات إلى توقعها والاستعداد لها وتجنبها.',
  },
  {
    id: 4,
    src: '/images/carouselHome/2.webp',
    alt: 'درع ذهبي عليه قفل على مكتب يرمز إلى حماية المعلومات الحساسة',
    title: 'السرية والأمان',
    description: 'قيمتان أساسيتان في عملنا مع كل عميل.',
  },
  {
    id: 5,
    src: '/images/carouselHome/4.webp',
    alt: 'ستة قطاعات متخصصة: الصحة والمقاولات والسياحة والزراعة والنقل البحري والصناعة والطاقة',
    title: 'القطاعات التخصصية',
    description: 'حلول استشارية مصممة وفق قطاعك ولوائحه وتحدياته التشغيلية.',
  },
];
