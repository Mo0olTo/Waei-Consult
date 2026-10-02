export interface NavigationLink {
  label: string;
  path: string;
}

export const MAIN_NAVIGATION: NavigationLink[] = [
  { label: 'الرئيسية', path: '/' },
  { label: 'من نحن', path: '/about' },
  { label: 'فريق عمل', path: '/crew' },
  { label: 'خدماتنا', path: '/services' },
  { label: 'لماذا واعي؟', path: '/why-waei' },
  { label: 'عملاؤنا المستهدفون', path: '/clients' },
  { label: 'تواصل معنا', path: '/contact' },
];
