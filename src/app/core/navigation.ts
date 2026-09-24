export interface NavigationLink {
  label: string;
  path: string;
}

export const MAIN_NAVIGATION: NavigationLink[] = [
  { label: 'الرئيسية', path: '/' },
  { label: 'من نحن', path: '/about' },
  { label: 'خدماتنا', path: '/services' },
  { label: 'لماذا واعي؟', path: '/why-waei' },
  { label: 'العملاء المستهدفون', path: '/clients' },
  { label: 'تواصل معنا', path: '/contact' },
];
