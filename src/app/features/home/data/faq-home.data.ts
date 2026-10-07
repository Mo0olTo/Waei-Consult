/** One FAQ entry. `answer` is a list of blocks so paragraphs and lists stay editable. */
export interface FaqItem {
  id: string;
  question: string;
  answer: readonly FaqBlock[];
}

export type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: readonly string[] }
  | { type: 'ol'; items: readonly string[] }
  | { type: 'labeled'; items: readonly { label: string; text: string }[] };

/**
 * Single source for the home FAQ accordion and its FAQPage JSON-LD.
 * Bracketed phrases are placeholders. Search for "TODO" before publishing.
 */
export const HOME_FAQ: readonly FaqItem[] = [
  {
    id: 'feasibility-cost',
    question: 'كم تكلفة دراسة الجدوى؟',
    answer: [
      {
        type: 'p',
        // TODO: replace [المبلغ] with the starting feasibility-study price in جنيه مصري.
        text: 'تختلف تكلفة دراسة الجدوى حسب حجم المشروع ونوعه ومستوى التفصيل المطلوب في الدراسة. تبدأ أسعارنا من [المبلغ] جنيه مصري، ونقدم لك عرض سعر واضح ومحدد بعد التعرف على فكرة مشروعك واحتياجاتك، دون أي رسوم خفية.',
      },
    ],
  },
  {
    id: 'feasibility-duration',
    question: 'كم الوقت المستغرق لإنجاز الدراسة؟',
    answer: [
      {
        type: 'p',
        // TODO: replace [7 إلى 21] with the real working-day range.
        text: 'تستغرق الدراسة عادةً من [7 إلى 21] يوم عمل بحسب طبيعة المشروع وسرعة تزويدنا بالمعلومات المطلوبة. نحدد لك المدة بدقة في عرض السعر، ونلتزم بالتسليم في الموعد المتفق عليه.',
      },
    ],
  },
  {
    id: 'study-contents',
    question: 'ما هي محتويات الدراسة؟',
    answer: [
      { type: 'p', text: 'تشمل الدراسة عادةً:' },
      {
        type: 'ul',
        items: [
          'الملخص التنفيذي ونبذة عن المشروع',
          'دراسة السوق وتحليل المنافسين والعملاء المستهدفين',
          'التحليل الاستراتيجي (SWOT)',
          'الخطة التسويقية والتشغيلية',
          'الهيكل التنظيمي والموارد البشرية',
          'الدراسة المالية: التكاليف، الإيرادات المتوقعة، نقطة التعادل، فترة الاسترداد، والتدفقات النقدية (بالجنيه المصري)',
          'تحليل المخاطر والتوصيات النهائية',
        ],
      },
    ],
  },
  {
    id: 'accreditation',
    question: 'هل الدراسة معتمدة، وهل يمكن تقديمها لجهات التمويل؟',
    answer: [
      {
        type: 'p',
        // TODO: replace the bracketed funding-body list if the accepted parties change.
        text: 'نعم، تُعد الدراسة وفق المعايير المهنية المعتمدة وبصيغة مقبولة لدى الجهات التمويلية. ويمكن تقديمها [للبنوك، وجهاز تنمية المشروعات المتوسطة والصغيرة ومتناهية الصغر، وصناديق الدعم، والمستثمرين]، كما نعدّلها حسب متطلبات الجهة التي ستقدَّم لها.',
      },
    ],
  },
  {
    id: 'financing',
    question: 'هل وعي تقدم خدمة التمويل؟',
    answer: [
      {
        type: 'p',
        text: 'وعي لا تقدم التمويل بشكل مباشر، لكننا نساعدك في الوصول إليه من خلال إعداد دراسة جدوى احترافية، وتوجيهك إلى الجهات التمويلية المناسبة لمشروعك، ومرافقتك في تجهيز الملفات المطلوبة للتقديم.',
      },
    ],
  },
  {
    id: 'commission',
    question: 'هل يأخذ المكتب نسبة من مبلغ التمويل أو من الأرباح؟',
    answer: [
      {
        type: 'p',
        text: 'لا، لا يأخذ المكتب أي نسبة من مبلغ التمويل أو من أرباح مشروعك. رسومنا ثابتة ومقابل الخدمة المقدمة فقط، وتبقى كامل الأرباح والتمويل لك.',
      },
    ],
  },
  {
    id: 'pricing-basis',
    question: 'على ماذا تستند تسعيرة عروض الأسعار للمشاريع؟',
    answer: [
      { type: 'p', text: 'تعتمد التسعيرة على عدة عوامل، أهمها:' },
      {
        type: 'ul',
        items: [
          'نوع المشروع ومجاله',
          'حجم المشروع ورأس المال المتوقع',
          'مستوى التفصيل وعمق التحليل المطلوب',
          'الجهة التي ستُقدَّم لها الدراسة',
          'المدة الزمنية المطلوبة للتسليم',
          'الحاجة إلى دراسات ميدانية أو بيانات إضافية',
        ],
      },
    ],
  },
  {
    id: 'after-approval',
    question: 'ماهي الخطوات بعد التعميد؟',
    answer: [
      {
        type: 'ol',
        items: [
          'توقيع العقد وسداد الدفعة الأولى',
          'تزويدنا بالمعلومات والمستندات المطلوبة عن المشروع',
          'بدء العمل على الدراسة من قِبل فريق متخصص',
          'مراجعة المسودة الأولية معك وتلقي ملاحظاتك',
          'إجراء التعديلات وتسليم الدراسة النهائية',
          'الدعم بعد التسليم للإجابة عن استفساراتك',
        ],
      },
    ],
  },
  {
    id: 'confidentiality',
    question: 'ما هي سياسة المحافظة على السرية؟',
    answer: [
      {
        type: 'p',
        text: 'نلتزم بالحفاظ التام على سرية فكرة مشروعك وجميع بياناتك ومعلوماتك المالية. لا نشاركها مع أي طرف ثالث، ويلتزم فريق العمل بالسرية، ويمكننا توقيع اتفاقية عدم إفصاح (NDA) بناءً على طلبك قبل البدء.',
      },
    ],
  },
  {
    id: 'consultation',
    question: 'كيف احجز استشارة؟ وكم تبلغ قيمتها؟ وكم مدتها؟ وما هو إجراء تقديمها؟',
    answer: [
      {
        type: 'labeled',
        items: [
          {
            label: 'الحجز',
            // TODO: replace [الموقع الإلكتروني / واتساب / الاتصال المباشر] with the real booking channels.
            text: 'عبر [الموقع الإلكتروني / واتساب / الاتصال المباشر] باختيار الموعد المناسب لك.',
          },
          {
            label: 'القيمة',
            // TODO: replace [المبلغ] with the consultation fee in جنيه مصري, and resolve [أو: الاستشارة الأولية مجانية].
            text: '[المبلغ] جنيه مصري، [أو: الاستشارة الأولية مجانية].',
          },
          {
            label: 'المدة',
            // TODO: replace [30 إلى 60] with the real consultation length in minutes.
            text: '[30 إلى 60] دقيقة.',
          },
          {
            label: 'الإجراء',
            text: 'بعد تأكيد الحجز والسداد، نرسل لك رابط الجلسة أو موعد اللقاء، ثم يناقش معك المستشار فكرة مشروعك ويقدم لك التوصيات والخطوات المناسبة.',
          },
        ],
      },
    ],
  },
];

/** Plain-text answer used by FAQPage structured data. */
export function faqAnswerPlainText(item: FaqItem): string {
  return item.answer
    .map((block) => {
      switch (block.type) {
        case 'p':
          return block.text;
        case 'ul':
          return block.items.map((line) => `• ${line}`).join('\n');
        case 'ol':
          return block.items.map((line, index) => `${index + 1}. ${line}`).join('\n');
        case 'labeled':
          return block.items.map((row) => `${row.label}: ${row.text}`).join('\n');
      }
    })
    .join('\n');
}

/** FAQPage JSON-LD generated from {@link HOME_FAQ}. */
export function buildFaqJsonLd(items: readonly FaqItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'ar',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerPlainText(item),
      },
    })),
  };

  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
